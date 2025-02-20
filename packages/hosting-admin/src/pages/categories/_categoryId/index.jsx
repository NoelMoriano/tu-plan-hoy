import React, { useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { useNavigate, useParams } from "react-router";
import Title from "antd/lib/typography/Title";
import { Button, Form, Input, notification } from "../../../components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useDefaultFirestoreProps,
  useDevice,
  useFormUtils,
} from "../../../hooks";
import { firestore } from "../../../firebase";
import { useGlobalData } from "../../../providers";
import { assign } from "lodash";
import { getNameId } from "../../../utils";
import {
  addCategory,
  updateCategory,
} from "../../../firebase/collections/index.js";

export const CategoryIntegration = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { isMobile } = useDevice();

  const { assignCreateProps, assignUpdateProps } = useDefaultFirestoreProps();

  const { categories } = useGlobalData();

  const [category, setCategory] = useState({});
  const [savingCategory, setSavingCategory] = useState(false);

  const onGoBack = () => navigate(-1);

  useEffect(() => {
    const category =
      categoryId === "new"
        ? { id: firestore.collection("categories").doc().id }
        : categories.find((category) => category.id === categoryId);

    if (!category) return onGoBack();

    setCategory(category);
  }, []);

  const onSubmitSaveCategory = async (formData) => {
    try {
      setSavingCategory(true);

      categoryId === "new"
        ? await addCategory(assignCreateProps(mapCategory(category, formData)))
        : await updateCategory(
            categoryId,
            assignUpdateProps(mapCategory(category, formData))
          );

      notification({ type: "success" });

      onGoBack();
    } catch (e) {
      console.log("ErrorSaveCategory: ", e);
      notification({ type: "error" });
    } finally {
      setSavingCategory(false);
    }
  };

  const mapCategory = (category, formData) =>
    assign(
      {},
      {
        id: category.id,
        nameId: getNameId(formData.name),
        name: formData.name,
      }
    );

  return (
    <Category
      category={category}
      onSubmitSaveCategory={onSubmitSaveCategory}
      onGoBack={onGoBack}
      savingCategory={savingCategory}
      isMobile={isMobile}
    />
  );
};

const Category = ({
  category,
  onSubmitSaveCategory,
  savingCategory,
  onGoBack,
}) => {
  const schema = yup.object({
    name: yup.string().required(),
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
  }, [category]);

  const resetForm = () => {
    reset({
      name: category?.name || "",
    });
  };

  const submitSaveCategory = (formData) => onSubmitSaveCategory(formData);

  return (
    <Row>
      <Col span={24}>
        <Title level={3}>Categoría</Title>
      </Col>
      <Col span={24}>
        <Form onSubmit={handleSubmit(submitSaveCategory)}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Nombre"
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
                disabled={savingCategory}
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
                disabled={savingCategory}
                loading={savingCategory}
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
