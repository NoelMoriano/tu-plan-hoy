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
import { useApiUserPost, useApiUserPut } from "../../../api";
import { Typography } from "antd";
import { userFullName } from "../../../utils/index.js";
import { getCompanyId } from "../../../firebase/collections/companies.js";

const { Title } = Typography;

export const CompanyIntegration = () => {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const { postUser, postUserResponse, postUserLoading } = useApiUserPost();
  const { putUser, putUserResponse, putUserLoading } = useApiUserPut();

  const { users, companies } = useGlobalData();

  const [company, setCompany] = useState({});

  useEffect(() => {
    const _company =
      companyId === "new"
        ? { id: getCompanyId() }
        : companies.find((company) => company.id === companyId);

    if (!_company) return navigate(-1);

    setCompany(_company);
  }, []);

  const onSubmitSaveCompany = async (formData) => {
    try {
      const _company = mapCompany(formData);

      await saveCompany(_company);

      notification({ type: "success" });

      onGoBack();
    } catch (e) {
      console.log("ErrorSaveCompany: ", e);
      notification({ type: "error" });
    }
  };

  const saveCompany = async (company) => {
    companyId === "new" ? await postUser(company) : await putUser(company);

    const responseStatus = postUserResponse.ok || putUserResponse.ok;

    if (!responseStatus) return notification({ type: "error" });
  };

  const mapCompany = (formData) => {
    return assign(
      {},
      {
        id: company.id,
        identificationType: formData.identificationType,
        identificationNumber: formData.identificationNumber,
        commercialName: formData.commercialName,
        socialReason: formData?.socialReason || "",
        overview: formData.overview,
        logo: formData.logo,
        userId: formData.userId,
      }
    );
  };

  const onGoBack = () => navigate(-1);

  return (
    <User
      company={company}
      users={users}
      onSubmitSaveCompany={onSubmitSaveCompany}
      onGoBack={onGoBack}
      isSavingCompany={postUserLoading || putUserLoading}
    />
  );
};

const User = ({
  company,
  users,
  onSubmitSaveCompany,
  onGoBack,
  isSavingCompany,
}) => {
  const [uploadingImage, setUploadingImage] = useState(false);

  const schema = yup.object({
    identificationType: yup.string().required(),
    identificationNumber: yup.string().required(),
    commercialName: yup.string().required(),
    socialReason: yup.string(),
    overview: yup.string().required(),
    logo: yup.mixed().required(),
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
      identificationType: company?.identificationType || "",
      identificationNumber: company?.identificationNumber || "",
      commercialName: company?.commercialName || null,
      socialReason: company?.socialReason || "",
      overview: company?.overview || "",
      logo: company?.logo || null,
      userId: company?.userId || "",
    });
  };

  const submitSaveCompany = (formData) => onSubmitSaveCompany(formData);

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
                name="identificationType"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Select
                    label="Tipo de identificación"
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={["ruc", "otro"].map((identification) => ({
                      label: identification.toUpperCase(),
                      value: identification,
                    }))}
                  />
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                name="identificationNumber"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Numero de identificación"
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
                name="overview"
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
