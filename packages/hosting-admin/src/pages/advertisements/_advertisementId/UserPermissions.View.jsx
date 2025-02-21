import React from "react";
import { Row, Col } from "antd";
import { Button, ItemPermission } from "../../../components/ui";
import { userPermissions } from "../../../data-list";
import Title from "antd/lib/typography/Title";

export const UserPermissionsView = ({
  currentAdvertisement,
  onShowModalPermissions,
}) => {
  const userPermissionsView = userPermissions.map((userPermission) => ({
    id: userPermission.id,
    value:
      !!currentAdvertisement?.advertisementSetup?.permissions?.[
        userPermission?.id
      ],
    label: userPermission.label,
  }));

  return (
    <Col span={24}>
      <Row gutter={[16, 16]}>
        <Col span={20} md={22}>
          <Title level={4}>Permisos</Title>
        </Col>
        <Col span={4} md={2}>
          <Button type="primary" onClick={onShowModalPermissions}>
            Editar
          </Button>
        </Col>
        <Col span={24}>
          {userPermissionsView.map((userPermission) => (
            <ItemPermission condition={userPermission.value}>
              {userPermission.label}
            </ItemPermission>
          ))}
        </Col>
      </Row>
    </Col>
  );
};
