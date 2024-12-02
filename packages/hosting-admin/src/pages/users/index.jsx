import React from "react";
import { Skeleton, Space, Typography } from "antd";
import {
  Avatar,
  Button,
  Col,
  Flex,
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
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { userFullName } from "../../utils/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

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

  const findRole = (roleCode) => roles.find((role) => role.code === roleCode);

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
        <Flex justify="space-between" wrap="wrap" size="middle">
          <Title level={3}>Usuarios</Title>
          <Button
            type="primary"
            onClick={() => onAddUser()}
            icon={<FontAwesomeIcon icon={faPlus} />}
          >
            Agregar usuario
          </Button>
        </Flex>
      </Col>
      <Col span={24}>
        <ListAntd
          className="demo-loadmore-list"
          loading={false}
          itemLayout={isMobile ? "vertical" : "horizontal"}
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
                    color: (theme) => theme.colors.error,
                  }}
                />,
              ]}
            >
              <Skeleton avatar title={false} loading={false} active>
                <ListAntd.Item.Meta
                  avatar={
                    <Avatar
                      src={
                        user?.profileImage?.thumbUrl ||
                        user?.profileImage?.url ||
                        "/avatar.webp"
                      }
                    />
                  }
                  title={
                    <Link to={`/users/${user.id}`}>{userFullName(user)}</Link>
                  }
                  description={
                    <Space direction="vertical">
                      <Text>{user?.email}</Text>
                      <Tag color="blue">
                        {findRole(user?.roleCode)?.name || ""}
                      </Tag>
                    </Space>
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
