import React from "react";
import { Col, Row } from "antd";
import { Button } from "../../../components/ui";
import Title from "antd/lib/typography/Title";

export const LocationView = ({ currentAdvertisement, onShowModalLocation }) => {
  const { advertisementSetup } = currentAdvertisement;

  return (
    <Col span={24}>
      <Row gutter={[16, 16]}>
        <Col span={20} md={22}>
          <Title level={4}>Ubicación</Title>
        </Col>
        <Col span={4} md={2}>
          <Button type="primary" onClick={onShowModalLocation}>
            Editar
          </Button>
        </Col>
        <Col span={24}>
          <div className="white-space">
            <span>Ciudad: </span>
            <strong>{advertisementSetup?.location?.city}</strong>
          </div>
          <div className="white-space">
            <span>Dirección: </span>
            <strong>{advertisementSetup?.location?.address}</strong>
          </div>
          <div className="white-space">
            <span>Referencia: </span>
            <strong>{advertisementSetup?.location?.reference}</strong>
          </div>
        </Col>
      </Row>
    </Col>
  );
};
