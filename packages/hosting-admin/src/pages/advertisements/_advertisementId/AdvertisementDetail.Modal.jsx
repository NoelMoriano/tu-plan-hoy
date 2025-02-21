import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  ComponentContainer,
  DatePicker,
  Form,
  Input,
  Select,
  TextArea,
  TimePicker,
} from "../../../components/ui/index.js";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useDefaultFirestoreProps,
  useFormUtils,
} from "../../../hooks/index.js";
import styled from "styled-components";
import { capitalize, isEmpty } from "lodash";
import { onUpdateAdvertisement } from "./_utils/index.js";
import dayjs from "dayjs";

export const AdvertisementDetailModal = ({
  isMobile,
  currentAdvertisement,
  categories,
  companies,
  onSetCurrentAdvertisement,
  onCancel,
}) => {
  const [saving, setSaving] = useState(false);

  const formatDate = (date) => dayjs(date).format("DD-MM-YYYY");
  const formatTime = (time) => dayjs(time).format("HH:mm");

  const { assignUpdateProps } = useDefaultFirestoreProps();

  const schema = yup.object({
    name: yup.string().required(),
    companyId: yup.string().required(),
    categoryIds: yup.array().required(),
    description: yup.string().required(),
    additionalInformation: yup.string().required(),
    startDate: yup.mixed().required(),
    endDate: yup.mixed().required(),
    startTime: yup.mixed().required(),
    endTime: yup.mixed().required(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error, errorMessage } = useFormUtils({ errors, schema });

  useEffect(() => {
    resetForm();
  }, [currentAdvertisement]);

  const resetForm = () => {
    reset({
      name: currentAdvertisement?.advertisementSetup?.detail?.name || "",
      companyId:
        currentAdvertisement?.advertisementSetup?.detail?.companyId ||
        undefined,
      categoryIds: !isEmpty(
        currentAdvertisement?.advertisementSetup?.detail?.categoryIds
      )
        ? currentAdvertisement?.advertisementSetup?.detail?.categoryIds
        : undefined,
      description:
        currentAdvertisement?.advertisementSetup?.detail?.description || "",
      additionalInformation:
        currentAdvertisement?.advertisementSetup?.detail
          ?.additionalInformation || "",
      startDate: currentAdvertisement?.advertisementSetup?.detail?.startDate
        ? dayjs(
            currentAdvertisement.advertisementSetup.detail.startDate,
            "DD-MM-YYYY"
          )
        : undefined,
      startTime: currentAdvertisement?.advertisementSetup?.detail?.startTime
        ? dayjs(
            currentAdvertisement.advertisementSetup.detail.startTime,
            "HH:mm"
          )
        : undefined,
      endDate: currentAdvertisement?.advertisementSetup?.detail?.endDate
        ? dayjs(
            currentAdvertisement.advertisementSetup.detail.endDate,
            "DD-MM-YYYY"
          )
        : undefined,
      endTime: currentAdvertisement?.advertisementSetup?.detail?.endTime
        ? dayjs(currentAdvertisement.advertisementSetup.detail.endTime, "HH:mm")
        : undefined,
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
          advertisementSetup: {
            ...currentAdvertisement.advertisementSetup,
            detail: {
              ...currentAdvertisement.advertisementSetup.detail,
              name: formData.name,
              companyId: formData.companyId,
              categoryIds: formData.categoryIds,
              description: formData.description,
              additionalInformation: formData.additionalInformation,
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
    <Row>
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
              <Controller
                name="description"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <TextArea
                    label="Descripción breve del evento"
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
                name="additionalInformation"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <TextArea
                    label="Información adicional del evento"
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
          </Row>
          <Row justify="end" gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Button
                type="default"
                size="large"
                block
                onClick={() => onCancel()}
                disabled={saving}
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
                disabled={saving}
                loading={saving}
              >
                Guardar
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Row>
  );
};

const Container = styled.section`
  width: 100%;

  form {
    width: 100%;
  }
`;
