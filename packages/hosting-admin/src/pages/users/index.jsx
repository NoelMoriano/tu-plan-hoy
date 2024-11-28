import React from "react";
import { Skeleton, Typography } from "antd";
import {
  Avatar,
  Button,
  Col,
  Divider,
  IconAction,
  ListAntd,
  modalConfirm,
  notification,
  Row,
  Tag,
} from "../../components/ui";
import { useAuthentication, useGlobalData } from "../../providers";
import { useNavigate } from "react-router";
import { useDevice } from "../../hooks";
import { roles } from "../../data-list";
import { useApiUserPatch } from "../../api";
import { assign } from "lodash";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { userFullName } from "../../utils/index.js";

const { Title, Text } = Typography;

export const Users = () => {
  const { isMobile } = useDevice();
  const navigate = useNavigate();
  const { authUser } = useAuthentication();
  const { users } = useGlobalData();
  const { patchUser, patchUserResponse } = useApiUserPatch();

  const navigateTo = (userId) => {
    const url = `/users/${userId}`;

    navigate(url);
  };

  const onAddUser = () => navigateTo("new");

  const onEditUser = (user) => navigateTo(user.id);

  const findRole = (roleCode) =>
    roles.find((role) => role.roleCode === roleCode);

  const onDeleteUser = async (_user) => {
    const user_ = assign({}, _user, { updateBy: authUser?.email });

    await patchUser(user_);

    if (!patchUserResponse.ok)
      return notification({
        type: "error",
      });

    notification({
      type: "success",
      title: "User deleted successfully!",
    });
  };

  const onConfirmRemoveUser = (user) =>
    modalConfirm({
      content: "El usuario se eliminara",
      onOk: async () => {
        await onDeleteUser(user);
      },
    });

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Button type="primary" onClick={() => onAddUser()}>
          Agregar usuario
        </Button>
      </Col>
      <Divider />
      <Col span={24}>
        <Title level={3}>Usuarios</Title>
      </Col>
      <Col span={24}>
        <ListAntd
          className="demo-loadmore-list"
          loading={false}
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(user) => (
            <ListAntd.Item
              actions={[
                <IconAction
                  key="edit"
                  data-testid="edit"
                  onClick={() => onEditUser(user)}
                  icon={faEdit}
                />,
                <IconAction
                  key="delete"
                  data-testid="delete"
                  onClick={() => onConfirmRemoveUser(user)}
                  icon={faTrash}
                  styled={{
                    color: () => "rgb(241, 13, 13)",
                  }}
                />,
              ]}
            >
              <Skeleton avatar title={false} loading={false} active>
                <ListAntd.Item.Meta
                  avatar={
                    <Avatar
                      src={
                        user?.profileImage?.thumbUrl || user?.profileImage?.url
                      }
                    />
                  }
                  title={<a href="https://ant.design">{userFullName(user)}</a>}
                  description={
                    <div>
                      <Tag color="blue">{user?.email}</Tag>
                    </div>
                  }
                />
              </Skeleton>
            </ListAntd.Item>
          )}
        />
      </Col>
    </Row>
  );
};
