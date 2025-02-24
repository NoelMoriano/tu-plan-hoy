import React, { useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Typography from "antd/lib/typography";
import {
  Button,
  Checkbox,
  DataEntryModal,
  FilterPanel,
  Input,
  Select,
  Space,
} from "../../components/ui";
import { modalConfirm, notification } from "../../components";
import {
  useDefaultFirestoreProps,
  useDevice,
  useQueryString,
  useResizeObserver,
} from "../../hooks";
import { useAuthentication, useGlobalData } from "../../providers";
import { useNavigate } from "react-router";
import { assign, isEmpty, isString, orderBy, toUpper } from "lodash";
import {
  advertisementsWithoutObservations,
  onActivateAdvertisementsBatch,
  onDeactivateAdvertisementsBatch,
  productsWithObservations,
  validateToActiveAdvertisement,
} from "./_advertisementId/_utils";
import { AdvertisementsList } from "./AdvertisementsList.jsx";
import styled from "styled-components";
import { AdvertisementsObservations } from "./AdvertisementsObservations.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useApiAdvertisementPatch } from "../../api";
import { InformationDetailModal } from "./_advertisementId/informationDetail.Modal.jsx";

const { Title } = Typography;

export const AdvertisementsIntegration = () => {
  const navigate = useNavigate();
  const { isMobile } = useDevice();
  const { currentScreenWidth } = useResizeObserver();
  const { assignDeleteProps } = useDefaultFirestoreProps();

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

  const [selectAllProducts, setSelectAllProducts] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

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

  const getCompanyById = (companyId) =>
    companies.find((company) => company.id === companyId);

  const getUserById = (userId) => users.find((user) => user.id === userId);

  const onAddProduct = () => navigateTo("new");

  const onEditProduct = (advertisement) => navigateTo(advertisement.id);

  const onDeleteAdvertisement = (advertisement) =>
    modalConfirm({
      content: "El anuncio se eliminara",
      onOk: async () => await deleteAdvertisement(advertisement),
    });

  const onSetSelectedProducts = (products) => setSelectedProducts(products);

  const onSetSelectAllProducts = (checked) => {
    setSelectAllProducts(checked);

    checked ? setSelectedProducts(advertisementsView) : setSelectedProducts([]);
  };

  const activateProducts = (products) => {
    try {
      const _productsWithoutObservations =
        advertisementsWithoutObservations(products);

      if (!isEmpty(_productsWithoutObservations)) {
        onActivateAdvertisementsBatch(_productsWithoutObservations);

        notification({
          type: "success",
          title: "¡Anuncios activados con éxito!",
        });
      }

      setSelectedProducts([]);
      setSelectAllProducts(false);

      const _productsWithObservations = productsWithObservations(products).map(
        (product) => ({
          ...product,
          observations: validateToActiveAdvertisement(product),
        })
      );

      !isEmpty(_productsWithObservations) &&
        notification({
          type: "warning",
          description: (
            <AdvertisementsObservations
              productObservations={_productsWithObservations}
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

  const deactivateProducts = (products) => {
    try {
      onDeactivateAdvertisementsBatch(products);

      setSelectedProducts([]);
      setSelectAllProducts(false);

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

  const onActivateProducts = () => {
    if (isEmpty(selectedProducts))
      return notification({
        type: "info",
        description: "No hay anuncios seleccionados",
      });

    const deactivatedProducts = selectedProducts.filter(
      (product) => !product.active
    );

    if (isEmpty(deactivatedProducts))
      return notification({
        type: "info",
        description: "No hay anuncios desactivados seleccionados",
      });

    modalConfirm({
      title: "¿Está seguro de que desea activar los anuncios?",
      onOk: () => activateProducts(deactivatedProducts),
    });
  };

  const onDeactivateProducts = () => {
    if (isEmpty(selectedProducts))
      return notification({
        type: "info",
        description: "No hay anuncios seleccionados",
      });

    const activatedProducts = selectedProducts.filter(
      (product) => product.active
    );

    if (isEmpty(activatedProducts))
      return notification({
        type: "info",
        description: "No hay anuncios activados seleccionados",
      });

    modalConfirm({
      title: "¿Está seguro de que desea desactivar los anuncios?",
      onOk: () => deactivateProducts(activatedProducts),
    });
  };

  const advertisementsView = advertisements
    .filter((advertisement) =>
      name
        ? toUpper(advertisement?.productContent?.productSetup?.name).includes(
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
    <Products
      advertisements={orderBy(advertisementsView, "createAt", "desc")}
      categories={categories}
      companies={companies}
      name={name}
      setName={setName}
      state={state}
      setState={setState}
      onAddProduct={onAddProduct}
      onEditProduct={onEditProduct}
      onDeleteProduct={onDeleteAdvertisement}
      onActivateProducts={onActivateProducts}
      onDeactivateProducts={onDeactivateProducts}
      selectedProducts={selectedProducts}
      onSetSelectedProducts={onSetSelectedProducts}
      selectAllProducts={selectAllProducts}
      onSetSelectAllProducts={onSetSelectAllProducts}
      currentScreenWidth={currentScreenWidth}
      isMobile={isMobile}
      onResetFilters={onResetFilters}
    />
  );
};

const Products = ({
  advertisements,
  categories,
  companies,
  name,
  setName,
  state,
  setState,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onActivateProducts,
  onDeactivateProducts,
  selectedProducts,
  onSetSelectedProducts,
  selectAllProducts,
  onSetSelectAllProducts,
  currentScreenWidth,
  isMobile,
  onResetFilters,
}) => {
  const [currentAdvertisement, setCurrentAdvertisement] = useState(null);
  const [isVisibleProductEdit, setIsVisibleProductEdit] = useState(false);
  const [isVisibleObservation, setIsVisibleObservation] = useState(false);

  const onSetCurrentProduct = (product_ = null) =>
    setCurrentAdvertisement(product_);
  const onSetIsVisibleProductEdit = (isVisibleProductEdit = false) =>
    setIsVisibleProductEdit(isVisibleProductEdit);
  const onSetIsVisibleObservations = (isVisibleObservation = false) =>
    setIsVisibleObservation(isVisibleObservation);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Button
            type="primary"
            onClick={() => onAddProduct()}
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
              checked={selectAllProducts}
              onChange={onSetSelectAllProducts}
            >
              Seleccionar todos
            </Checkbox>
          </Space>
        </Col>
        <Col span={24} sm={12}>
          <Space style={{ display: "flex", justifyContent: "end" }}>
            <Button size="large" onClick={() => onActivateProducts()}>
              Activar
            </Button>
            <Button danger size="large" onClick={() => onDeactivateProducts()}>
              Desactivar
            </Button>
          </Space>
        </Col>
        <Col span={24}>
          <AdvertisementsList
            advertisements={advertisements}
            companies={companies}
            selectedProducts={selectedProducts}
            onSetCurrentProduct={onSetCurrentProduct}
            onSetIsVisibleProductEdit={onSetIsVisibleProductEdit}
            onSetIsVisibleObservations={onSetIsVisibleObservations}
            onSetSelectedProducts={onSetSelectedProducts}
            onEditProduct={onEditProduct}
            onDeleteProduct={onDeleteProduct}
            currentScreenWidth={currentScreenWidth}
          />
        </Col>
      </Row>
      <WrapperModals>
        <DataEntryModal
          visible={isVisibleProductEdit}
          onCancel={() => onSetIsVisibleProductEdit(false)}
        >
          <InformationDetailModal
            key={isVisibleProductEdit}
            isMobile={isMobile}
            currentAdvertisement={currentAdvertisement}
            categories={categories}
            companies={companies}
            onSetCurrentAdvertisement={onSetCurrentProduct}
            onCancel={() => onSetIsVisibleProductEdit(false)}
          />
        </DataEntryModal>
        <DataEntryModal
          visible={isVisibleObservation}
          onCancel={() => onSetIsVisibleObservations(false)}
        ></DataEntryModal>
      </WrapperModals>
    </>
  );
};

const WrapperModals = styled.div`
  .ant-modal-body {
    overflow: hidden;
  }
`;
