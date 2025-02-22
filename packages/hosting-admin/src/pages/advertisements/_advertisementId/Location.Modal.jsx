import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Input, Select } from "../../../components/ui/index.js";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useDefaultFirestoreProps,
  useFormUtils,
} from "../../../hooks/index.js";
import styled from "styled-components";
import { capitalize } from "lodash";
import { onUpdateAdvertisement } from "./_utils";
import { cities } from "../../../data-list";

export const LocationModal = ({
  isMobile,
  currentAdvertisement,
  onSetCurrentAdvertisement,
  onCancel,
}) => {
  const [saving, setSaving] = useState(false);

  const { assignUpdateProps } = useDefaultFirestoreProps();

  const schema = yup.object({
    city: yup.string().required(),
    address: yup.string().required(),
    reference: yup.string(),
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
    const { advertisementSetup } = currentAdvertisement;
    const { location } = advertisementSetup;

    reset({
      city: location?.city || "",
      address: location?.address || "",
      reference: location?.reference || "",
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
            location: {
              ...currentAdvertisement.advertisementSetup.location,
              city: formData.city,
              address: formData.address,
              reference: formData.reference,
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
              name="city"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <Select
                  label="Cuidad"
                  value={value}
                  onChange={(value) => onChange(value)}
                  error={error(name)}
                  required={required(name)}
                  helperText={errorMessage(name)}
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
                  helperText={errorMessage(name)}
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
  );
};

const Container = styled.section`
  width: 100%;

  form {
    width: 100%;
  }
`;
