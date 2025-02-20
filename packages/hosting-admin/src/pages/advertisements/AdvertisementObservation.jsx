import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, TextArea, Title } from "../../components";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDefaultFirestoreProps, useFormUtils } from "../../hooks";
import styled from "styled-components";
import { onUpdateAdvertisement } from "./_advertisementId/_utils";
import { isEmpty } from "lodash";

export const AdvertisementObservation = ({
  currentProduct,
  onSetCurrentProduct,
  onCancel,
}) => {
  const [saving, setSaving] = useState(false);

  const { assignUpdateProps } = useDefaultFirestoreProps();

  const schema = yup.object({
    observations: yup.string().nullable(),
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
  }, [currentProduct]);

  const resetForm = () => {
    reset({
      observations: currentProduct?.observations,
    });
  };

  const onSubmit = () =>
    new Promise(() => {
      setSaving(true);
      handleSubmit((formData) => {
        onUpdateAdvertisement(
          currentProduct.id,
          assignUpdateProps({
            observations: isEmpty(formData.observations)
              ? null
              : formData.observations,
          })
        );

        onSetCurrentProduct(null);
      })();

      setSaving(false);
      onCancel();
    });

  return (
    <Row>
      <Title level={3}>Observaciones de producto</Title>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Controller
                name="observations"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <TextArea
                    label="Observaciones"
                    rows={10}
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    helperText={errorMessage(name)}
                    required={required(name)}
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
    </Row>
  );
};

const Container = styled.section`
  width: 100%;

  form {
    width: 100%;
  }
`;
