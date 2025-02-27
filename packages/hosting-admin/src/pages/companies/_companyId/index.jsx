import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  notification,
  Row,
  Select,
  TextArea,
} from "../../../components/ui";
import { Upload } from "../../../components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDevice, useFormUtils } from "../../../hooks";
import { useGlobalData } from "../../../providers";
import { assign, capitalize } from "lodash";
import { useApiCompanyPost, useApiCompanyPut } from "../../../api";
import { Typography } from "antd";
import { userFullName } from "../../../utils/index.js";
import { getCompanyId } from "../../../firebase/collections";
import {
  apiErrorNotification,
  getApiErrorResponse,
} from "../../../api/apiErrors.js";
import { cities } from "../../../data-list/index.js";
import { SocialField } from "./SocialField.jsx";

const { Title } = Typography;

export const CompanyIntegration = () => {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const { users, companies, categories } = useGlobalData();

  const { postCompany, postCompanyResponse, postCompanyLoading } =
    useApiCompanyPost();
  const { putCompany, putCompanyResponse, putCompanyLoading } =
    useApiCompanyPut();

  const [company, setCompany] = useState({});

  const isNew = companyId === "new";

  useEffect(() => {
    const _company = isNew
      ? { id: getCompanyId() }
      : companies.find((company) => company.id === companyId);

    if (!_company) return navigate(-1);

    setCompany(_company);
  }, []);

  const saveCompany = async (formData) => {
    try {
      const _company = mapCompany(formData);

      const response = isNew
        ? await postCompany(_company)
        : await putCompany(_company);

      if (isNew ? !postCompanyResponse.ok : !putCompanyResponse.ok) {
        throw new Error(response);
      }

      notification({
        type: "success",
        title: "Empresa creada exitosamente!",
      });

      return onGoBack();
    } catch (e) {
      console.log("saveCompany: ", e);
      const errorResponse = await getApiErrorResponse(e);
      apiErrorNotification(errorResponse);
    }
  };

  const mapCompany = (formData) => {
    return assign(
      {},
      {
        id: company.id,
        document: {
          type: formData.documentType,
          number: formData.documentNumber,
        },
        commercialName: formData.commercialName.toUpperCase(),
        socialReason: (formData?.socialReason || "").toUpperCase(),
        logo: formData.logo,
        description: formData.description,
        socialMedia: {
          fb: {
            name: formData.socialMedia.fb.name,
            url: formData.socialMedia.fb.url,
          },
          tiktok: {
            name: formData.socialMedia.tiktok.name,
            url: formData.socialMedia.tiktok.url,
          },
          instagram: {
            name: formData.socialMedia.instagram.name,
            url: formData.socialMedia.instagram.url,
          },
          x: {
            name: formData.socialMedia.x.name,
            url: formData.socialMedia.x.url,
          },
          linkedin: {
            name: formData.socialMedia.linkedin.name,
            url: formData.socialMedia.linkedin.url,
          },
        },
        phone: {
          prefix: "+51",
          number: formData.phoneNumber,
        },
        city: formData.city,
        address: formData.address,
        userId: formData.userId,
      }
    );
  };

  const onGoBack = () => navigate(-1);

  return (
    <Company
      company={company}
      users={users}
      categories={categories}
      onSaveCompany={saveCompany}
      onGoBack={onGoBack}
      isSavingCompany={postCompanyLoading || putCompanyLoading}
    />
  );
};

const Company = ({
  company,
  users,
  categories,
  onSaveCompany,
  onGoBack,
  isSavingCompany,
}) => {
  const { isMobile } = useDevice();
  const [uploadingImage, setUploadingImage] = useState(false);

  const socials = ["facebook", "tiktok", "instagram", "x", "linkedin"];

  const schema = yup.object({
    commercialName: yup.string().required(),
    categoryIds: yup.array().required(),
    wspNumber: yup.string().required(),
    city: yup.string().required(),
    address: yup.string().required(),
    reference: yup.string(),
    userId: yup.string().required(),
    documentNumber: yup.string(),
    description: yup.string().required(),
    ...socials.reduce((acc, social) => {
      acc[social] = yup
        .object({
          name: yup.string(),
          url: yup.string(),
        })
        .nullable()
        .required();
      return acc;
    }, {}),
    logo: yup.mixed().required(),
    sitePhoto: yup.mixed().required(),
    gallery: yup.array(),
    ytVideoUrl: yup.string().required(),
  });

  console.log("schema: ", schema);

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...socials.reduce((acc, social) => {
        acc[social] = undefined;
        return acc;
      }, {}),
    },
  });

  const { required, error } = useFormUtils({ errors, schema });

  useEffect(() => {
    resetForm();
  }, [company]);

  const resetForm = () => {
    reset({
      documentNumber: company?.document?.number || "",
      commercialName: company?.commercialName || null,
      logo: company?.logo || null,
      sitePhoto: company?.sitePhoto || null,
      description: company?.description || "",
      userId: company?.userId || "",
    });
  };

  const submitSaveCompany = (formData) => {
    console.log("formData: ", formData);
    // return onSaveCompany(formData);
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={20} md={22}>
        <Title level={4}>Información</Title>
      </Col>
      <Col span={24}>
        <Form onSubmit={handleSubmit(submitSaveCompany)}>
          <Row gutter={[16, 16]}>
            <Col span={24} sm={12}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Controller
                    name="commercialName"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <Input
                        label="Nombre comercial"
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
                    name="categoryIds"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <Select
                        label="¿Escoge algunas categorias?"
                        mode="multiple"
                        value={value}
                        onChange={(value) => onChange(value)}
                        error={error(name)}
                        required={required(name)}
                        isMobile={isMobile}
                        options={categories.map((category) => ({
                          value: category.id,
                          label: capitalize(category.name),
                        }))}
                      />
                    )}
                  />
                </Col>
                <Col span={24}>
                  <Controller
                    name="wspNumber"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <InputNumber
                        label="Numero de whatsapp"
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
                    name="city"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <Select
                        label="Cuidad"
                        value={value}
                        onChange={(value) => onChange(value)}
                        error={error(name)}
                        required={required(name)}
                        isMobile={isMobile}
                        options={cities.map((city) => ({
                          value: city.id,
                          label: capitalize(city.value),
                        }))}
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
                    name="reference"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <Input
                        label="Referencia"
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
                    name="userId"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <Select
                        label="A que usuario pertenece la empresa"
                        value={value}
                        onChange={onChange}
                        error={error(name)}
                        required={required(name)}
                        options={users.map((user) => ({
                          label: userFullName(user),
                          value: user.id,
                        }))}
                      />
                    )}
                  />
                </Col>
                <Col span={24}>
                  <Controller
                    name="documentNumber"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <Input
                        label="RUC de empresa"
                        value={value}
                        onChange={onChange}
                        error={error(name)}
                        required={required(name)}
                      />
                    )}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={24} sm={12}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Controller
                    name="ytVideoUrl"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <Input
                        label="Coloca el link de tu video de Youtube"
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
                    name="description"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <TextArea
                        label="Descripción"
                        rows={6}
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
            </Col>
          </Row>
          <Divider />
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={4}>Imagenes</Title>
            </Col>
            <Col span={24} sm={12}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Controller
                    name="logo"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <Upload
                        label="Logo (400x400)"
                        accept="image/*"
                        name={name}
                        value={value}
                        bucket="tphCompanies"
                        filePath={`${company.id}`}
                        resize="400x400"
                        buttonText="Subir logo"
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
                    name="sitePhoto"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <Upload
                        label="Foto del local (836x522)"
                        accept="image/*"
                        name={name}
                        value={value}
                        bucket="tphCompanies"
                        filePath={`${company.id}`}
                        resize="836x522"
                        buttonText="Subir logo"
                        error={error(name)}
                        required={required(name)}
                        onChange={(file) => onChange(file)}
                        onUploading={setUploadingImage}
                      />
                    )}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={24} sm={12}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Controller
                    name="gallery"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <Upload
                        label="Fotos de galeria"
                        multiple
                        accept="image/*"
                        name={name}
                        value={value}
                        bucket="tphCompanies"
                        filePath={`${company.id}/gallery`}
                        buttonText="Subir fotos"
                        error={error(name)}
                        required={required(name)}
                        onChange={(file) => onChange(file)}
                        onUploading={setUploadingImage}
                      />
                    )}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider />
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={4}>Redes sociales</Title>
            </Col>
            {socials.map((social, index) => (
              <Col key={index} span={24} sm={12} md={8}>
                <Controller
                  name={social}
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <SocialField
                      label={capitalize(social)}
                      name={name}
                      value={value}
                      onChange={onChange}
                      error={error(name)}
                      required={required(name)}
                    />
                  )}
                />
              </Col>
            ))}
          </Row>
          <Row justify="end" gutter={[16, 16]}>
            <Col xs={24} sm={6} md={4}>
              <Button
                type="default"
                size="large"
                block
                onClick={() => onGoBack()}
                disabled={uploadingImage || isSavingCompany}
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
                loading={isSavingCompany}
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
