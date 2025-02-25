import React, { useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Typography from "antd/lib/typography";
import {
  Button,
  Checkbox,
  FilterPanel,
  Input,
  Select,
  Space,
} from "../../components/ui";
import { modalConfirm, notification } from "../../components";
import { useDevice, useQueryString, useResizeObserver } from "../../hooks";
import { useAuthentication, useGlobalData } from "../../providers";
import { useNavigate } from "react-router";
import { assign, isEmpty, isString, orderBy, toUpper } from "lodash";
import {
  advertisementsWithObservations,
  advertisementsWithoutObservations,
  onActivateAdvertisementsBatch,
  onDeactivateAdvertisementsBatch,
  validateToActiveAdvertisement,
} from "./_advertisementId/_utils";
import { AdvertisementsList } from "./AdvertisementsList.jsx";
import { AdvertisementsObservations } from "./AdvertisementsObservations.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useApiAdvertisementPatch } from "../../api";

const { Title } = Typography;

export const AdvertisementsIntegration = () => {
  const navigate = useNavigate();
  const { isMobile } = useDevice();
  const { currentScreenWidth } = useResizeObserver();

  const { authUser } = useAuthentication();
  const { categories, advertisements, companies, users } = useGlobalData();

  const { patchAdvertisement, patchAdvertisementResponse } =
    useApiAdvertisementPatch();

  const [state, setState] = useQueryString("state", "all");
  const [name, setName] = useQueryString("name", "");

  const onResetFilters = () => {
    setName("");
    setState("all");
    navigate("/advertisements");
  };

  if (!isString(state)) throw new Error(`state is not string: ${state}`);

  const navigateTo = (advertisementId) => {
    const url = `/advertisements/${advertisementId}`;
    navigate(url);
  };

  const [selectAllAdvertisements, setSelectAllAdvertisements] = useState(false);
  const [selectedAdvertisements, setSelectedAdvertisements] = useState([]);

  const deleteAdvertisement = async (advertisement) => {
    const _advertisement = assign({}, advertisement, {
      updateBy: authUser?.email,
    });

    await patchAdvertisement(_advertisement);

    if (!patchAdvertisementResponse.ok)
      return notification({
        type: "error",
      });

    notification({
      type: "success",
      title: "Anuncio eliminada exitosamente!",
    });
  };

  const onAddAdvertisement = () => navigateTo("new");

  const onEditAdvertisement = (advertisement) => navigateTo(advertisement.id);

  const onDeleteAdvertisement = (advertisement) =>
    modalConfirm({
      content: "El anuncio se eliminara",
      onOk: async () => await deleteAdvertisement(advertisement),
    });

  const onSetSelectedAdvertisements = (advertisements) =>
    setSelectedAdvertisements(advertisements);

  const onSetSelectAllAdvertisements = (checked) => {
    setSelectAllAdvertisements(checked);

    checked
      ? setSelectedAdvertisements(advertisementsView)
      : setSelectedAdvertisements([]);
  };

  const activateAdvertisements = (advertisements) => {
    try {
      const _advertisementsWithoutObservations =
        advertisementsWithoutObservations(advertisements);

      if (!isEmpty(_advertisementsWithoutObservations)) {
        onActivateAdvertisementsBatch(_advertisementsWithoutObservations);

        notification({
          type: "success",
          title: "¡Anuncios activados con éxito!",
        });
      }

      setSelectedAdvertisements([]);
      setSelectAllAdvertisements(false);

      const _advertisementsWithObservations = advertisementsWithObservations(
        advertisements
      ).map((advertisement) => ({
        ...advertisement,
        observations: validateToActiveAdvertisement(advertisement),
      }));

      !isEmpty(_advertisementsWithObservations) &&
        notification({
          type: "warning",
          description: (
            <AdvertisementsObservations
              advertisementsObservations={_advertisementsWithObservations}
            />
          ),
          duration: 30,
        });
    } catch (e) {
      notification({
        type: "error",
      });
    }
  };

  const deactivateAdvertisements = (advertisements) => {
    try {
      onDeactivateAdvertisementsBatch(advertisements);

      setSelectedAdvertisements([]);
      setSelectAllAdvertisements(false);

      notification({
        type: "success",
        title: "¡Anuncios desactivados con éxito!",
      });
    } catch (e) {
      notification({
        type: "error",
      });
    }
  };

  const onActivateAdvertisements = () => {
    if (isEmpty(selectedAdvertisements))
      return notification({
        type: "info",
        description: "No hay anuncios seleccionados",
      });

    const deactivatedAdvertisements = selectedAdvertisements.filter(
      (advertisement) => !advertisement.active
    );

    if (isEmpty(deactivatedAdvertisements))
      return notification({
        type: "info",
        description: "No hay anuncios desactivados seleccionados",
      });

    modalConfirm({
      title: "¿Está seguro de que desea activar los anuncios?",
      onOk: () => activateAdvertisements(deactivatedAdvertisements),
    });
  };

  const onDeactivateAdvertisements = () => {
    if (isEmpty(selectedAdvertisements))
      return notification({
        type: "info",
        description: "No hay anuncios seleccionados",
      });

    const activatedAdvertisements = selectedAdvertisements.filter(
      (advertisement) => advertisement.active
    );

    if (isEmpty(activatedAdvertisements))
      return notification({
        type: "info",
        description: "No hay anuncios activados seleccionados",
      });

    modalConfirm({
      title: "¿Está seguro de que desea desactivar los anuncios?",
      onOk: () => deactivateAdvertisements(activatedAdvertisements),
    });
  };

  const advertisementsView = advertisements
    .filter((advertisement) =>
      name
        ? toUpper(advertisement?.advertisementSetup?.detail.name).includes(
            toUpper(name)
          )
        : true
    )
    .filter((advertisement) =>
      state === "all"
        ? true
        : state === "active"
        ? advertisement?.active
        : !advertisement.active
    );

  return (
    <Advertisements
      advertisements={orderBy(advertisementsView, "createAt", "desc")}
      companies={companies}
      name={name}
      setName={setName}
      state={state}
      setState={setState}
      onAddAdvertisement={onAddAdvertisement}
      onEditAdvertisement={onEditAdvertisement}
      onDeleteAdvertisement={onDeleteAdvertisement}
      onActivateAdvertisements={onActivateAdvertisements}
      onDeactivateAdvertisements={onDeactivateAdvertisements}
      selectedAdvertisements={selectedAdvertisements}
      onSetSelectedAdvertisements={onSetSelectedAdvertisements}
      selectAllAdvertisements={selectAllAdvertisements}
      onSetSelectAllAdvertisements={onSetSelectAllAdvertisements}
      currentScreenWidth={currentScreenWidth}
      onResetFilters={onResetFilters}
    />
  );
};

const Advertisements = ({
  advertisements,
  companies,
  name,
  setName,
  state,
  setState,
  onAddAdvertisement,
  onEditAdvertisement,
  onDeleteAdvertisement,
  onActivateAdvertisements,
  onDeactivateAdvertisements,
  selectedAdvertisements,
  onSetSelectedAdvertisements,
  selectAllAdvertisements,
  onSetSelectAllAdvertisements,
  currentScreenWidth,
  onResetFilters,
}) => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Button
            type="primary"
            onClick={() => onAddAdvertisement()}
            size="large"
            icon={<FontAwesomeIcon icon={faPlus} />}
          >
            Agregar anuncio
          </Button>
        </Col>
        <Col span={24}>
          <FilterPanel title="Filtros">
            <Row gutter={[16, 20]} style={{ width: "100%" }}>
              <Col sm={12} span={24}>
                <Input
                  label="Nombre o titulo del anuncio"
                  variant="filled"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
              <Col sm={6} span={24}>
                <Select
                  label="Estado"
                  variant="filled"
                  allowClear={false}
                  value={state}
                  onChange={(value) => setState(value)}
                  options={[
                    { label: "Todos", value: "all" },
                    { label: "Activos", value: "active" },
                    { label: "Desactivados", value: "deactivate" },
                  ]}
                />
              </Col>
              <Col sm={6} span={24}>
                <Space
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                  }}
                >
                  <Button onClick={() => onResetFilters()}>
                    Limpiar filtros
                  </Button>
                </Space>
              </Col>
            </Row>
          </FilterPanel>
        </Col>
        <Col span={24}>
          <Title level={5}>Anuncios ({advertisements.length})</Title>
        </Col>
        <Col span={24} sm={12}>
          <Space align="center">
            <Checkbox
              checked={selectAllAdvertisements}
              onChange={onSetSelectAllAdvertisements}
            >
              Seleccionar todos
            </Checkbox>
          </Space>
        </Col>
        <Col span={24} sm={12}>
          <Space style={{ display: "flex", justifyContent: "end" }}>
            <Button size="large" onClick={() => onActivateAdvertisements()}>
              Activar
            </Button>
            <Button
              danger
              size="large"
              onClick={() => onDeactivateAdvertisements()}
            >
              Desactivar
            </Button>
          </Space>
        </Col>
        <Col span={24}>
          <AdvertisementsList
            advertisements={advertisements}
            companies={companies}
            selectedAdvertisements={selectedAdvertisements}
            onSetSelectedAdvertisements={onSetSelectedAdvertisements}
            onEditAdvertisement={onEditAdvertisement}
            onDeleteAdvertisement={onDeleteAdvertisement}
            currentScreenWidth={currentScreenWidth}
          />
        </Col>
      </Row>
    </>
  );
};
