import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  DataEntryModal,
  Form,
  Input,
  Select,
} from "../../../components";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDefaultFirestoreProps, useFormUtils } from "../../../hooks";
import styled from "styled-components";
import { onSaveAdvertisement } from "./_utils";
import { getAdvertisementId } from "../../../firebase/collections";
import { capitalize, toLower, uniq } from "lodash";
import { useNavigate } from "react-router";
import { getNameId } from "../../../utils";
import Title from "antd/lib/typography/Title";

export const CreateNewAdvertisement = ({
  categories = [],
  companies = [],
  isMobile,
  onGoBack,
}) => {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);

  const { assignCreateProps } = useDefaultFirestoreProps();

  const onClickToAdvertisement = (advertisementId) => {
    const url = `/advertisements/${advertisementId}`;

    navigate(url);
  };

  const schema = yup.object({
    name: yup.string().required(),
    companyId: yup.string().required(),
    categoryIds: yup.array().required(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error, errorMessage } = useFormUtils({
    errors,
    schema,
  });

  const onSubmit = () =>
    new Promise(() => {
      handleSubmit(async (formData) => {
        try {
          setSaving(true);

          const advertisement = mapAdvertisement(formData);

          await onSaveAdvertisement(advertisement.id, advertisement);

          setSaving(false);
          onClickToAdvertisement(advertisement.id);
        } finally {
          setSaving(false);
        }
      })();
    });

  const mapAdvertisement = (formData) =>
    assignCreateProps({
      isDeleted: false,
      active: false,
      id: getAdvertisementId(),
      nameId: getNameId(formData.name),
      searchData: uniq([
        ...formData?.categoryIds,
        formData?.companyId,
        toLower(formData.name),
      ]),
      advertisementSetup: {
        adImage: formData?.adImage || null,
        youTubeVideoUrl: formData?.youTubeVideoUrl || null,
        detail: {
          name: formData.name,
          companyId: formData.companyId,
          categoryIds: formData?.categoryIds || [],
        },
      },
    });

  return (
    <Row>
      <DataEntryModal visible={true} onCancel={onGoBack}>
        <Title level={3}>Nuevo anuncio</Title>
        <Container>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row gutter={[16, 16]}>
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
                        label: capitalize(company.name),
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
            </Row>
            <div className="btn-wrapper">
              <Row justify="start" gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                  <Button
                    block
                    htmlType="submit"
                    type="primary"
                    size="large"
                    loading={saving}
                  >
                    Guardar
                  </Button>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Button
                    block
                    size="large"
                    onClick={() => onGoBack()}
                    disabled={saving}
                  >
                    Cancelar
                  </Button>
                </Col>
              </Row>
            </div>
          </Form>
        </Container>
      </DataEntryModal>
    </Row>
  );
};

const Container = styled.section`
  width: 100%;

  form {
    width: 100%;
  }
`;
