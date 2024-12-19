import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Button,
  Col,
  Form,
  Input,
  notification,
  Row,
  Select,
  TextArea,
} from "../../../components/ui";
import { Upload } from "../../../components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFormUtils } from "../../../hooks";
import { useGlobalData } from "../../../providers";
import { assign, capitalize } from "lodash";
import { useApiAdvertisementPost, useApiAdvertisementPut } from "../../../api";
import { Typography } from "antd";
import { getAdvertisementId } from "../../../firebase/collections";
import {
  apiErrorNotification,
  getApiErrorResponse,
} from "../../../api/apiErrors.js";

const { Title } = Typography;

export const AdvertisementIntegration = () => {
  const navigate = useNavigate();
  const { advertisementId } = useParams();
  const { advertisements, companies, users } = useGlobalData();

  const {
    postAdvertisement,
    postAdvertisementResponse,
    postAdvertisementLoading,
  } = useApiAdvertisementPost();
  const {
    putAdvertisement,
    putAdvertisementResponse,
    putAdvertisementLoading,
  } = useApiAdvertisementPut();

  const [advertisement, setAdvertisement] = useState({});

  const isNew = advertisementId === "new";

  useEffect(() => {
    const _advertisement = isNew
      ? { id: getAdvertisementId() }
      : advertisements.find(
          (advertisement) => advertisement.id === advertisementId
        );

    if (!_advertisement) return navigate(-1);

    setAdvertisement(_advertisement);
  }, []);

  const saveAdvertisement = async (formData) => {
    try {
      const _advertisement = mapAdvertisement(formData);

      const response = isNew
        ? await postAdvertisement(_advertisement)
        : await putAdvertisement(_advertisement);

      if (
        isNew ? !postAdvertisementResponse.ok : !putAdvertisementResponse.ok
      ) {
        throw new Error(response);
      }

      notification({
        type: "success",
        title: "Anuncio creado exitosamente!",
      });

      return onGoBack();
    } catch (e) {
      console.log("saveAdvertisement: ", e);
      const errorResponse = await getApiErrorResponse(e);
      apiErrorNotification(errorResponse);
    }
  };

  const mapAdvertisement = (formData) => {
    const _company = companies.find(
      (company) => company.id === formData.companyId
    );

    return assign(
      {},
      {
        id: advertisement.id,
        adImage: formData.adImage,
        title: formData.title,
        address: formData.address,
        overview: formData.overview,
        imageGallery: formData.imageGallery,
        videoGallery: formData.videoGallery,
        company: _company,
        user: users.find((user) => user.id === _company.userId),
      }
    );
  };

  const onGoBack = () => navigate(-1);

  return (
    <Advertisement
      advertisement={advertisement}
      companies={companies}
      onSaveAdvertisement={saveAdvertisement}
      onGoBack={onGoBack}
      isSavingAdvertisement={
        postAdvertisementLoading || putAdvertisementLoading
      }
    />
  );
};

const Advertisement = ({
  advertisement,
  companies,
  onSaveAdvertisement,
  onGoBack,
  isSavingAdvertisement,
}) => {
  const [uploadingImage, setUploadingImage] = useState(false);

  const schema = yup.object({
    adImage: yup.mixed().required(),
    title: yup.string().required(),
    address: yup.string().required(),
    overview: yup.string().required(),
    companyId: yup.string().required(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error } = useFormUtils({ errors, schema });

  useEffect(() => {
    resetForm();
  }, [advertisement]);

  const resetForm = () => {
    reset({
      adImage: advertisement?.adImage || null,
      title: advertisement?.title || "",
      address: advertisement?.address || "",
      overview: advertisement?.overview || "",
      companyId: advertisement?.company?.id || "",
    });
  };

  const submitSaveAdvertisement = (formData) => onSaveAdvertisement(formData);

  return (
    <Row>
      <Col span={24}>
        <Title level={3}>Anuncio</Title>
      </Col>
      <Col span={24}>
        <Form onSubmit={handleSubmit(submitSaveAdvertisement)}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Controller
                name="adImage"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Upload
                    label="Imagen anuncio (500x400)"
                    accept="image/*"
                    name={name}
                    value={value}
                    filePath={`/advertisements/${advertisement.id}`}
                    buttonText="Subir imagen de anuncio"
                    error={error(name)}
                    required={required(name)}
                    onChange={(file) => onChange(file)}
                    onUploading={setUploadingImage}
                  />
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                name="title"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Titulo"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                name="address"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Dirección"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                name="companyId"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Select
                    label="¿A que empresa pertenece el anuncio?"
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={companies.map((company) => ({
                      label: capitalize(company.commercialName),
                      value: company.id,
                    }))}
                  />
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                name="overview"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <TextArea
                    label="Descripción general"
                    rows={10}
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
          </Row>
          <Row justify="end" gutter={[16, 16]}>
            <Col xs={24} sm={6} md={4}>
              <Button
                type="default"
                size="large"
                block
                onClick={() => onGoBack()}
                disabled={uploadingImage || isSavingAdvertisement}
              >
                Cancelar
              </Button>
            </Col>
            <Col xs={24} sm={6} md={4}>
              <Button
                type="primary"
                size="large"
                block
                htmlType="submit"
                disabled={uploadingImage}
                loading={isSavingAdvertisement}
              >
                Guardar
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
