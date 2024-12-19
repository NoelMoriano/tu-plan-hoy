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
import { assign } from "lodash";
import { useApiCompanyPost, useApiCompanyPut } from "../../../api";
import { Typography } from "antd";
import { userFullName } from "../../../utils/index.js";
import { getCompanyId } from "../../../firebase/collections";
import {
  apiErrorNotification,
  getApiErrorResponse,
} from "../../../api/apiErrors.js";

const { Title } = Typography;

export const CompanyIntegration = () => {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const { users, companies } = useGlobalData();

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
      onSaveCompany={saveCompany}
      onGoBack={onGoBack}
      isSavingCompany={postCompanyLoading || putCompanyLoading}
    />
  );
};

const Company = ({
  company,
  users,
  onSaveCompany,
  onGoBack,
  isSavingCompany,
}) => {
  const [uploadingImage, setUploadingImage] = useState(false);

  const schema = yup.object({
    documentType: yup.string().required(),
    documentNumber: yup.string().required(),
    commercialName: yup.string().required(),
    socialReason: yup.string(),
    logo: yup.mixed().required(),
    description: yup.string().required(),
    prefixNumber: yup.string().required(),
    phoneNumber: yup.string().required(),
    address: yup.string().required(),
    userId: yup.string().required(),
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
  }, [company]);

  const resetForm = () => {
    reset({
      documentType: company?.document?.type || "",
      documentNumber: company?.document?.number || "",
      commercialName: company?.commercialName || null,
      socialReason: company?.socialReason || "",
      logo: company?.logo || null,
      description: company?.description || "",
      userId: company?.userId || "",
    });
  };

  const submitSaveCompany = (formData) => onSaveCompany(formData);

  return (
    <Row>
      <Col span={24}>
        <Title level={3}>Empresa</Title>
      </Col>
      <Col span={24}>
        <Form onSubmit={handleSubmit(submitSaveCompany)}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Controller
                name="documentType"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Select
                    label="Tipo de documento"
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={["ruc", "otro"].map((document) => ({
                      label: document.toUpperCase(),
                      value: document,
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
                    label="Numero de documento"
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
                name="socialReason"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Razon social"
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
