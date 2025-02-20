import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import List from "antd/lib/list";
import Divider from "antd/lib/divider";
import Typography from "antd/lib/typography";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button, IconAction, modalConfirm } from "../../components";
import { useDefaultFirestoreProps, useDevice } from "../../hooks";
import { useGlobalData } from "../../providers";
import { useNavigate } from "react-router";
import { capitalize } from "lodash";
import { Link } from "react-router-dom";
import { updateCategory } from "../../firebase/collections/index.js";

const { Title } = Typography;

export const CategoriesIntegration = () => {
  const { isMobile } = useDevice();
  const navigate = useNavigate();
  const { assignDeleteProps } = useDefaultFirestoreProps();

  const { categories } = useGlobalData();

  const navigateTo = (categoryId) => {
    const url = `/categories/${categoryId}`;

    navigate(url);
  };

  const onAddCategory = () => navigateTo("new");

  const onEditCategory = (category) => navigateTo(category.id);

  const onConfirmRemoveCategory = (category) =>
    modalConfirm({
      content: "La categoria se eliminara",
      onOk: async () => await updateCategory(assignDeleteProps(category)),
    });

  return (
    <Categories
      isMobile={isMobile}
      categories={categories}
      onAddCategory={onAddCategory}
      onEditCategory={onEditCategory}
      onConfirmRemoveCategory={onConfirmRemoveCategory}
    />
  );
};

const Categories = ({
  isMobile,
  categories,
  onAddCategory,
  onEditCategory,
  onConfirmRemoveCategory,
}) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Button type="primary" onClick={() => onAddCategory()}>
          Agregar categoría
        </Button>
      </Col>
      <Divider />
      <Col span={24}>
        <Title level={3}>Categorías</Title>
      </Col>
      <Col span={24}>
        <List
          className="demo-loadmore-list"
          itemLayout={isMobile ? "vertical" : "horizontal"}
          dataSource={categories}
          renderItem={(category) => (
            <List.Item
              actions={[
                <IconAction
                  key={category.id}
                  tooltipTitle="Editar"
                  icon={faEdit}
                  onClick={() => onEditCategory(category)}
                />,
                <IconAction
                  key={category.id}
                  tooltipTitle="Eliminar"
                  styled={{ color: (theme) => theme.colors.error }}
                  icon={faTrash}
                  onClick={() => onConfirmRemoveCategory(category)}
                />,
              ]}
            >
              <List.Item.Meta
                title={
                  <Link to={`/categories/${category.id}`}>
                    <h4 className="link-color">{capitalize(category.name)}</h4>
                  </Link>
                }
              />
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};
