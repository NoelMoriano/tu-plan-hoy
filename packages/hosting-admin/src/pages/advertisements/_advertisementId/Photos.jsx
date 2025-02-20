import React, { useState } from "react";
import { Button, DataEntryModal } from "../../../components/ui";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Image from "antd/lib/image";
import { onUpdateAdvertisement } from "./_utils";
import { getUrlPublic } from "../../../utils";
import Title from "antd/lib/typography/Title";

export const Photos = ({ currentProduct, onSetCurrentProduct }) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const onSetIsVisibleModal = () => setIsVisibleModal(!isVisibleModal);

  const onUploadImagesChange = async (images) => {
    if (!currentProduct.id) return console.error("Missing product.id");

    await onUpdateAdvertisement(currentProduct.id, {
      productContent: {
        ...currentProduct.productContent,
        photos: images,
      },
    });

    onSetCurrentProduct({
      ...currentProduct,
      productContent: {
        ...currentProduct.productContent,
        photos: images,
      },
    });
  };

  return (
    <Row>
      <Col span={24}>
        <Button type="primary" onClick={onSetIsVisibleModal}>
          Editar
        </Button>
      </Col>
      {isVisibleModal && (
        <DataEntryModal visible={isVisibleModal} onCancel={onSetIsVisibleModal}>
          <Title level={3}>Administrar fotos</Title>
          <p>Se recomienda imagenes de (1000x1000)</p>
          {/*<UploadImages*/}
          {/*  bucketType="photos"*/}
          {/*  path={`${currentProduct.id}`}*/}
          {/*  images={currentProduct?.productContent?.photos || []}*/}
          {/*  onChange={onUploadImagesChange}*/}
          {/*/>*/}
        </DataEntryModal>
      )}
    </Row>
  );
};
