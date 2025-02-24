import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  ComponentContainer,
  DatePicker,
  Form,
  Input,
  RadioGroup,
  Select,
  TextArea,
  TimePicker,
} from "../../../components/ui";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDefaultFirestoreProps, useFormUtils } from "../../../hooks";
import styled from "styled-components";
import { capitalize, isEmpty, toLower } from "lodash";
import { onUpdateAdvertisement } from "./_utils";
import dayjs from "dayjs";
import { Upload } from "../../../components";
import { restrictions } from "../../../data-list";
import { getNameId } from "../../../utils/index.js";

export const InformationDetailModal = ({
  isMobile,
  currentAdvertisement,
  categories,
  companies,
  onSetCurrentAdvertisement,
  onCancel,
}) => {
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const formatDate = (date) => dayjs(date).format("DD-MM-YYYY");
  const formatTime = (time) => dayjs(time).format("HH:mm");

  const { assignUpdateProps } = useDefaultFirestoreProps();

  const schema = yup.object({
    name: yup.string().required(),
    companyId: yup.string().required(),
    categoryIds: yup.array().required(),
    description: yup.string().required(),
    additionalInformation: yup.string(),
    startDate: yup.mixed().required(),
    endDate: yup.mixed().required(),
    startTime: yup.mixed().required(),
    endTime: yup.mixed().required(),
    adImage: yup.mixed().required(),
    adVideoUrl: yup.string().required(),
    restriction: yup.string().required(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      restriction: undefined,
    },
  });

  const { required, error, errorMessage } = useFormUtils({ errors, schema });

  useEffect(() => {
    resetForm();
  }, [currentAdvertisement]);

  const resetForm = () => {
    const { advertisementSetup } = currentAdvertisement;
    const { detail } = advertisementSetup;

    reset({
      name: detail.name || "",
      companyId: detail?.companyId || undefined,
      categoryIds: !isEmpty(detail?.categoryIds)
        ? detail?.categoryIds
        : undefined,
      description: detail?.description || "",
      additionalInformation: detail?.additionalInformation || "",
      startDate: detail?.startDate
        ? dayjs(detail.startDate, "DD-MM-YYYY")
        : undefined,
      startTime: detail?.startTime
        ? dayjs(detail.startTime, "HH:mm")
        : undefined,
      endDate: detail?.endDate
        ? dayjs(detail.endDate, "DD-MM-YYYY")
        : undefined,
      endTime: detail?.endTime ? dayjs(detail.endTime, "HH:mm") : undefined,
      adImage: advertisementSetup.adImage || undefined,
      adVideoUrl: advertisementSetup.adVideoUrl || "",
      restriction: detail.restriction || undefined,
    });
  };

  const onSubmit = () =>
    new Promise(() => {
      setSaving(true);
      handleSubmit((formData) => {
        if (!currentAdvertisement?.id)
          throw new Error("Missing currentAdvertisement.id");

        const currentAdvertisement_ = {
          ...currentAdvertisement,
          nameId: getNameId(formData.name),
          searchData: [
            ...formData?.categoryIds,
            formData?.companyId,
            toLower(formData.name),
          ],
          advertisementSetup: {
            ...currentAdvertisement.advertisementSetup,
            adImage: formData.adImage,
            adVideoUrl: formData.adVideoUrl,
            detail: {
              ...currentAdvertisement.advertisementSetup.detail,
              name: formData.name,
              companyId: formData.companyId,
              categoryIds: formData.categoryIds,
              description: formData.description,
              additionalInformation: formData?.additionalInformation || "",
              startDate: formData?.startDate
                ? formatDate(formData.startDate)
                : undefined,
              startTime: formData?.startTime
                ? formatTime(formData.startTime)
                : undefined,
              endDate: formData?.endDate
                ? formatDate(formData.endDate)
                : undefined,
              endTime: formData?.endTime
                ? formatTime(formData.endTime)
                : undefined,
              restriction: formData.restriction,
            },
          },
        };

        onUpdateAdvertisement(
          currentAdvertisement.id,
          assignUpdateProps(currentAdvertisement_)
        );

        onSetCurrentAdvertisement(currentAdvertisement_);
      })();

      setSaving(false);
      onCancel();
    });

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[17, 17]}>
          <Col span={24}>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Nombre"
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error(name)}
                  required={required(name)}
                  helperText={errorMessage(name)}
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
                  label="Empresa"
                  value={value}
                  onChange={(value) => onChange(value)}
                  error={error(name)}
                  required={required(name)}
                  helperText={errorMessage(name)}
                  isMobile={isMobile}
                  options={companies.map((company) => ({
                    value: company.id,
                    label: capitalize(company.commercialName),
                  }))}
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
                  label="¿Cuales son las categorias del anuncio?"
                  mode="multiple"
                  value={value}
                  onChange={(value) => onChange(value)}
                  error={error(name)}
                  required={required(name)}
                  helperText={errorMessage(name)}
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
            <ComponentContainer.group label="Fecha y hora de inicio">
              <Row gutter={[16, 16]}>
                <Col span={24} sm={12}>
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <DatePicker
                        label="Fecha de inicio"
                        name={name}
                        value={value}
                        onChange={onChange}
                        error={error(name)}
                        required={required(name)}
                        helperText={errorMessage(name)}
                      />
                    )}
                  />
                </Col>
                <Col span={24} sm={12}>
                  <Controller
                    name="startTime"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <TimePicker
                        label="Hora de inicio"
                        name={name}
                        value={value}
                        onChange={onChange}
                        error={error(name)}
                        required={required(name)}
                        helperText={errorMessage(name)}
                      />
                    )}
                  />
                </Col>
              </Row>
            </ComponentContainer.group>
          </Col>
          <Col span={24}>
            <ComponentContainer.group label="Fecha y hora de finalización">
              <Row gutter={[16, 16]}>
                <Col span={24} sm={12}>
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <DatePicker
                        label="Fecha de finalización"
                        name={name}
                        value={value}
                        onChange={onChange}
                        error={error(name)}
                        required={required(name)}
                        helperText={errorMessage(name)}
                      />
                    )}
                  />
                </Col>
                <Col span={24} sm={12}>
                  <Controller
                    name="endTime"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <TimePicker
                        label="Hora de finalización"
                        name={name}
                        value={value}
                        onChange={onChange}
                        error={error(name)}
                        required={required(name)}
                        helperText={errorMessage(name)}
                      />
                    )}
                  />
                </Col>
              </Row>
            </ComponentContainer.group>
          </Col>
          <Col span={24}>
            <ComponentContainer.group label="Banner del anuncio">
              <Controller
                name="adImage"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Upload
                    label="Imagen anuncio (836x522)"
                    accept="image/*"
                    name={name}
                    value={value}
                    bucket="tphAdvertisements"
                    resize="836x522"
                    filePath={`/${currentAdvertisement.id}`}
                    buttonText="Subir imagen de anuncio"
                    error={error(name)}
                    required={required(name)}
                    onChange={(file) => onChange(file)}
                    onUploading={setUploadingImage}
                  />
                )}
              />
            </ComponentContainer.group>
          </Col>
          <Col span={24}>
            <ComponentContainer.group label="Video del anuncio">
              <Controller
                name="adVideoUrl"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Coloca el link de tu video de Youtube"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    helperText={errorMessage(name)}
                  />
                )}
              />
            </ComponentContainer.group>
          </Col>
          <Col span={24}>
            <Controller
              name="description"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <TextArea
                  label="Descripción breve del anuncio"
                  rows={4}
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error(name)}
                  required={required(name)}
                  helperText={errorMessage(name)}
                />
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="restriction"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <RadioGroup
                  label="Restricción"
                  value={value}
                  name={name}
                  checked={value}
                  onChange={(checked) => onChange(checked)}
                  required={required(name)}
                  error={error(name)}
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  options={restrictions.map((restriction) => ({
                    label: restriction.value,
                    value: restriction.id,
                  }))}
                />
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="additionalInformation"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <TextArea
                  label="Información adicional del anuncio"
                  rows={7}
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error(name)}
                  required={required(name)}
                  helperText={errorMessage(name)}
                />
              )}
            />
          </Col>
        </Row>
        <Row justify="end" gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Button
              type="default"
              size="large"
              block
              onClick={() => onCancel()}
              disabled={saving || uploadingImage}
            >
              Cancelar
            </Button>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Button
              type="primary"
              size="large"
              block
              htmlType="submit"
              disabled={saving || uploadingImage}
              loading={saving}
            >
              Guardar
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;

  form {
    width: 100%;
  }
`;
