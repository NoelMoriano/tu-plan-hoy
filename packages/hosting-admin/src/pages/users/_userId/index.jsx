import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  InputPassword,
  notification,
  Row,
  Select,
} from "../../../components/ui";
import { Upload } from "../../../components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFormUtils } from "../../../hooks";
import { firestore } from "../../../firebase";
import { useGlobalData } from "../../../providers";
import { assign, capitalize } from "lodash";
import { useApiUserPost, useApiUserPut } from "../../../api";
import { countriesISO, genders, roles } from "../../../data-list";
import { Typography } from "antd";

const { Title } = Typography;

export const UserIntegration = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { postUser, postUserResponse, postUserLoading } = useApiUserPost();
  const { putUser, putUserResponse, putUserLoading } = useApiUserPut();

  const { users } = useGlobalData();

  const [user, setUser] = useState({});

  useEffect(() => {
    const _user =
      userId === "new"
        ? { id: firestore.collection("users").doc().id }
        : users.find((user) => user.id === userId);

    if (!_user) return navigate(-1);

    setUser(_user);
  }, []);

  const onSubmitSaveUser = async (formData) => {
    try {
      const _user = mapUser(formData);

      await saveUser(_user);

      notification({ type: "success" });

      onGoBack();
    } catch (e) {
      console.log("ErrorSaveUser: ", e);
      notification({ type: "error" });
    }
  };

  const saveUser = async (user) => {
    userId === "new" ? await postUser(user) : await putUser(user);

    const responseStatus = postUserResponse.ok || putUserResponse.ok;

    if (!responseStatus) return notification({ type: "error" });
  };

  const mapUser = (formData) => {
    return assign(
      {},
      {
        id: user.id,
        roleCode: formData.roleCode,
        document: {
          type: "dni",
          number: formData.documentNumber,
        },
        firstName: formData.firstName,
        paternalSurname: formData.paternalSurname,
        maternalSurname: formData.maternalSurname,
        countryCode: formData.countryCode,
        gender: formData.gender,
        email: formData.email.toLowerCase(),
        password: formData.password,
        phone: {
          prefix: formData.prefixNumber,
          number: formData.phoneNumber,
        },
        ...(formData?.profileImage && { profileImage: formData.profileImage }),
        termsAndConditions: formData.termsAndConditions,
        sendingInformationAndPromotions:
          formData.sendingInformationAndPromotions,
      }
    );
  };

  const onGoBack = () => navigate(-1);

  return (
    <User
      user={user}
      onSubmitSaveUser={onSubmitSaveUser}
      onGoBack={onGoBack}
      isSavingUser={postUserLoading || putUserLoading}
    />
  );
};

const User = ({ user, onSubmitSaveUser, onGoBack, isSavingUser }) => {
  const [uploadingImage, setUploadingImage] = useState(false);

  const schema = yup.object({
    roleCode: yup.string().required(),
    documentNumber: yup.string().required(),
    firstName: yup.string().required(),
    paternalSurname: yup.string().required(),
    maternalSurname: yup.string().required(),
    countryCode: yup.string().required(),
    gender: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    prefixNumber: yup.string().required(),
    phoneNumber: yup.string().required(),
    termsAndConditions: yup.boolean().required(),
    sendingInformationAndPromotions: yup.boolean().required(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      termsAndConditions: true,
      sendingInformationAndPromotions: true,
    },
  });

  const { required, error } = useFormUtils({ errors, schema });

  useEffect(() => {
    resetForm();
  }, [user]);

  const resetForm = () => {
    reset({
      roleCode: user?.roleCode || null,
      documentNumber: user?.document?.number || "",
      firstName: user?.firstName || "",
      paternalSurname: user?.paternalSurname || "",
      maternalSurname: user?.maternalSurname || "",
      countryCode: user?.countryCode || null,
      gender: user?.gender || null,
      prefixNumber: user?.phone?.prefix || "+51",
      phoneNumber: user?.phone?.number || "",
      email: user?.email || "",
      password: user?.password || "",
      profileImage: user?.profileImage || null,
      termsAndConditions: user?.termsAndConditions,
      sendingInformationAndPromotions: user?.sendingInformationAndPromotions,
    });
  };

  const filterOptionPhone = (inputValue, optionLabel) =>
    optionLabel.toUpperCase().includes(inputValue.toUpperCase());

  const submitSaveUser = (formData) => onSubmitSaveUser(formData);

  return (
    <Row>
      <Col span={24}>
        <Title level={3}>Usuario</Title>
      </Col>
      <Col span={24}>
        <Form onSubmit={handleSubmit(submitSaveUser)}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Controller
                name="roleCode"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Select
                    label="Rol"
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={roles.map((role) => ({
                      label: capitalize(role.roleName),
                      value: role.roleCode,
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
                name="firstName"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Nombres"
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
                name="paternalSurname"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Apellido paterno"
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
                name="maternalSurname"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Apellido materno"
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
                name="countryCode"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Select
                    label="Pais"
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={countriesISO.map((country) => ({
                      key: country.alpha2,
                      label: country.name,
                      value: country.alpha2,
                    }))}
                  />
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                name="gender"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Select
                    label="Genero"
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={genders}
                  />
                )}
              />
            </Col>
            <Col xs={24} sm={6} md={6}>
              <Controller
                name="prefixNumber"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Select
                    label="Prefijo"
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    filterOption={filterOptionPhone}
                    options={countriesISO.map((country) => ({
                      key: country.alpha2,
                      label: `(${country.phonePrefix}) ${capitalize(
                        country.name
                      )}`,
                      value: country.phonePrefix,
                    }))}
                  />
                )}
              />
            </Col>
            <Col xs={24} sm={18} md={18}>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <InputNumber
                    label="Ingrese teléfono"
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
                name="email"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Email"
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
                name="password"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <InputPassword
                    label="Contraseña"
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
                name="profileImage"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Upload
                    label="Foto"
                    accept="image/*"
                    name={name}
                    value={value}
                    bucket="tphUsers"
                    filePath={`${user.id}/profile`}
                    resize="250x250"
                    buttonText="Subir foto"
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
                name="termsAndConditions"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Checkbox
                    value={value}
                    name={name}
                    checked={value}
                    onChange={(checked) => onChange(checked)}
                    required={required(name)}
                    error={error(name)}
                  >
                    Términos y condiciones
                  </Checkbox>
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                name="sendingInformationAndPromotions"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Checkbox
                    value={value}
                    name={name}
                    checked={value}
                    onChange={(checked) => onChange(checked)}
                    required={required(name)}
                    error={error(name)}
                  >
                    Envío de información y promociones
                  </Checkbox>
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
                disabled={uploadingImage || isSavingUser}
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
                loading={isSavingUser}
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
