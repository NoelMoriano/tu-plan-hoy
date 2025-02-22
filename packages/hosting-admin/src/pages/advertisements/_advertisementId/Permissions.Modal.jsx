import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Checkbox, Form } from "../../../components/ui";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDefaultFirestoreProps, useFormUtils } from "../../../hooks";
import styled from "styled-components";
import { onUpdateAdvertisement } from "./_utils";
import { userPermissions } from "../../../data-list/index.js";

export const PermissionsModal = ({
  currentAdvertisement,
  onSetCurrentAdvertisement,
  onCancel,
}) => {
  const [saving, setSaving] = useState(false);

  const { assignUpdateProps } = useDefaultFirestoreProps();

  const schema = yup.object({
    ...userPermissions.reduce((acc, userPermission) => {
      acc[userPermission.id] = yup.bool().required();

      return acc;
    }, {}),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...userPermissions.reduce((acc, userPermission) => {
        acc[userPermission.id] = false;

        return acc;
      }, {}),
    },
  });

  const { required, error } = useFormUtils({ errors, schema });

  useEffect(() => {
    resetForm();
  }, [currentAdvertisement]);

  const resetForm = () => {
    reset({
      ...userPermissions.reduce((acc, userPermission) => {
        acc[userPermission.id] =
          currentAdvertisement?.advertisementSetup?.permissions?.[
            userPermission.id
          ] || null;

        return acc;
      }, {}),
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
            permissions: { ...formData },
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
            {userPermissions.map((userPermission) => (
              <Col span={24}>
                <Controller
                  name={userPermission.id}
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
                      {userPermission.label}
                    </Checkbox>
                  )}
                />
              </Col>
            ))}
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
`;
