import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Form,
  Input,
  ComponentContainer,
} from "../../../components/ui";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDefaultFirestoreProps, useFormUtils } from "../../../hooks";
import styled from "styled-components";
import { onUpdateAdvertisement } from "./_utils";
import { Upload } from "../../../components";

export const ImageAndVideoModal = ({
  currentAdvertisement,
  onSetCurrentAdvertisement,
  onCancel,
}) => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);

  const { assignUpdateProps } = useDefaultFirestoreProps();

  const schema = yup.object({
    adImage: yup.mixed().required(),
    adVideoUrl: yup.string().required(),
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
      adImage: currentAdvertisement?.advertisementSetup?.adImage || undefined,
      adVideoUrl: currentAdvertisement?.advertisementSetup?.adVideoUrl || "",
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
            adImage: formData.adImage,
            adVideoUrl: formData.adVideoUrl,
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
    </Row>
  );
};

const Container = styled.section`
  width: 100%;
`;
