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
  RadioGroup,
  Row,
  Select,
  TextArea,
} from "../../../components/ui";
import { Upload, UploadMultiple } from "../../../components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDevice, useFormUtils } from "../../../hooks";
import { useGlobalData } from "../../../providers";
import { assign, capitalize } from "lodash";
import { useApiCompanyPost, useApiCompanyPut } from "../../../api";
import { Typography } from "antd";
import { getNameId, userFullName } from "../../../utils/index.js";
import { getCompanyId } from "../../../firebase/collections";
import {
  apiErrorNotification,
  getApiErrorResponse,
} from "../../../api/apiErrors.js";
import { cities } from "../../../data-list/index.js";
import { SocialField } from "./SocialField.jsx";

const { Title } = Typography;

const socials = ["facebook", "tiktok", "instagram", "x", "linkedin"];

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
        ...(company?.id && { id: company.id }),
        ...(company?.active && { active: company.active }),
        ...(company?.isHighlighted && { isHighlighted: company.isHighlighted }),
        nameId: getNameId(formData.name),
        name: formData.name,
        categoryIds: formData.categoryIds,
        phone: {
          prefix: "+51",
          number: formData.phoneNumber,
        },
        wsp: {
          prefix: "+51",
          number: formData.wspNumber,
        },
        city: formData.city,
        address: formData.address,
        reference: formData.reference,
        userId: formData.userId,
        document: {
          type: formData?.documentType || "RUC",
          number: formData?.documentNumber || null,
        },
        youTubeVideoUrl: formData.youTubeVideoUrl,
        description: formData.description,
        logo: formData.logo,
        coverImage: formData.coverImage,
        gallery: formData.gallery,
        socialMedia: {
          ...socials.reduce((acc, social) => {
            acc[social] = formData?.[social]
              ? {
                  name: formData?.[social]?.name || null,
                  url: formData?.[social]?.url || null,
                }
              : null;
            return acc;
          }, {}),
        },
        isHighlighted: formData.isHighlighted,
        active: formData.active,
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

  const schema = yup.object({
    name: yup.string().required(),
    categoryIds: yup.array().required(),
    phoneNumber: yup.string().required(),
    wspNumber: yup.string().required(),
    city: yup.string().required(),
    address: yup.string().required(),
    reference: yup.string(),
    userId: yup.string().required(),
    documentNumber: yup.string(),
    description: yup.string().required(),
    logo: yup.mixed().required(),
    coverImage: yup.mixed().required(),
    gallery: yup.mixed().notRequired(),
    youTubeVideoUrl: yup.string().required(),
    ...socials.reduce((acc, social) => {
      acc[social] = yup
        .object({
          name: yup.string(),
          url: yup.string(),
        })
        .notRequired()
        .nullable();
      return acc;
    }, {}),
    isHighlighted: yup.boolean().required(),
    active: yup.boolean().required(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gallery: undefined,
      ...socials.reduce((acc, social) => {
        acc[social] = undefined;
        return acc;
      }, {}),
      isHighlighted: null,
      active: null,
    },
  });

  const { required, error } = useFormUtils({ errors, schema });

  useEffect(() => {
    resetForm();
  }, [company]);

  const resetForm = () => {
    reset({
      name: company?.name || "",
      categoryIds: company?.categoryIds || null,
      phoneNumber: company?.phone?.number || "",
      wspNumber: company?.wsp?.number || "",
      city: company?.city || null,
      address: company?.address || "",
      reference: company?.reference || "",
      userId: company?.userId || null,
      documentNumber: company?.document?.number || "",
      youTubeVideoUrl: company?.youTubeVideoUrl || "",
      description: company?.description || "",
      logo: company?.logo || null,
      coverImage: company?.coverImage || null,
      gallery: company?.gallery || null,
      ...socials.reduce((acc, social) => {
        acc[social] = company?.socialMedia?.[social]
          ? {
              name: company?.socialMedia?.[social]?.name || "",
              url: company?.socialMedia?.[social]?.url || "",
            }
          : null;
        return acc;
      }, {}),
      isHighlighted: company?.isHighlighted,
      active: company?.active,
    });
  };

  const submitSaveCompany = (formData) => onSaveCompany(formData);

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
                    name="name"
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
                    name="phoneNumber"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <InputNumber
                        label="Numero de teléfono"
                        name={name}
                        value={value}
                        onChange={(value) => {
                          setValue("wspNumber", value);
                          onChange(value);
                        }}
                        error={error(name)}
                        required={required(name)}
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
                    name="youTubeVideoUrl"
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
                    name="coverImage"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <Upload
                        label="Imagen de portada (836x522)"
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
                      <UploadMultiple
                        label="Fotos de galeria"
                        accept="image/*"
                        name={name}
                        value={value}
                        isImage={false}
                        withThumbImage={false}
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
              <Col key={social || index} span={24} sm={12} md={8}>
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
          <Divider />
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={4}>Estado</Title>
            </Col>
            <Col span={24} sm={12}>
              <Controller
                name="isHighlighted"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <RadioGroup
                    label="Destacar la empresa"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      {
                        label: "Si",
                        value: true,
                      },
                      {
                        label: "No",
                        value: false,
                      },
                    ]}
                  />
                )}
              />
            </Col>
            <Col span={24} sm={12}>
              <Controller
                name="active"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <RadioGroup
                    label="Publicar empresa"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      {
                        label: "Si",
                        value: true,
                      },
                      {
                        label: "No",
                        value: false,
                      },
                    ]}
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
