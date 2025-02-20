import React from "react";
import { Skeleton, Typography } from "antd";
import {
  Button,
  Col,
  Flex,
  IconAction,
  Image,
  ListAntd,
  modalConfirm,
  notification,
  Row,
  Space,
  Tag,
} from "../../components/ui";
import { useAuthentication, useGlobalData } from "../../providers";
import { useNavigate } from "react-router";
import { useDevice } from "../../hooks";
import { useApiUserPatch } from "../../api";
import { assign, capitalize } from "lodash";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { userFullName } from "../../utils/index.js";

const { Title, Text } = Typography;

export const Advertisements = () => {
  const { isMobile } = useDevice();
  const navigate = useNavigate();
  const { authUser } = useAuthentication();
  const { advertisements, companies, users } = useGlobalData();
  const { patchUser, patchUserResponse } = useApiUserPatch();

  const navigateTo = (advertisementId) => {
    const url = `/advertisements/${advertisementId}`;
    navigate(url);
  };

  const onAddAdvertisement = () => navigateTo("new");

  const onEditAdvertisement = (advertisement) => navigateTo(advertisement.id);

  const onDeleteAdvertisement = async (advertisement) => {
    const _advertisement = assign({}, advertisement, {
      updateBy: authUser?.email,
    });

    await patchUser(_advertisement);

    if (!patchUserResponse.ok)
      return notification({
        type: "error",
      });

    notification({
      type: "success",
      title: "Anuncio eliminada exitosamente!",
    });
  };

  const onConfirmRemoveAdvertisement = (advertisement) =>
    modalConfirm({
      content: "El anuncio se eliminara",
      onOk: async () => {
        await onDeleteAdvertisement(advertisement);
      },
    });

  const getCompanyById = (companyId) =>
    companies.find((company) => company.id === companyId);

  const getUserById = (userId) => users.find((user) => user.id === userId);

  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        <Flex justify="space-between" wrap="wrap" size="middle">
          <Title level={3}>Anuncios</Title>
          <Button
            type="primary"
            onClick={() => onAddAdvertisement()}
            icon={<FontAwesomeIcon icon={faPlus} />}
          >
            Agregar anuncio
          </Button>
        </Flex>
      </Col>
      <Col span={24}>
        <ListAntd
          className="demo-loadmore-list"
          loading={false}
          itemLayout={isMobile ? "vertical" : "horizontal"}
          dataSource={advertisements}
          renderItem={(advertisement) => (
            <ListAntd.Item
              actions={[
                <IconAction
                  key="edit"
                  data-testid="edit"
                  onClick={() => onEditAdvertisement(advertisement)}
                  icon={faEdit}
                />,
                <IconAction
                  key="delete"
                  data-testid="delete"
                  onClick={() => onConfirmRemoveAdvertisement(advertisement)}
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
                    <Image
                      src={
                        advertisement?.adImage?.thumbUrl ||
                        advertisement?.adImage?.url ||
                        "/avatar.webp"
                      }
                      width={200}
                    />
                  }
                  title={
                    <Link to={`/advertisements/${advertisement.id}`}>
                      {capitalize(
                        advertisement?.advertisementSetup.detail.name
                      )}
                    </Link>
                  }
                  description={
                    <Space direction="vertical">
                      <p>{advertisement?.description}</p>
                      <Flex>
                        <Link to={`/companies/${advertisement.company.id}`}>
                          <Tag color="blue">
                            {capitalize(
                              getCompanyById(
                                advertisement.advertisementSetup.detail
                                  .companyId
                              )?.commercialName
                            )}
                          </Tag>
                        </Link>
                        <Link to={`/users/${advertisement.user.id}`}>
                          <Tag color="blue">
                            {capitalize(
                              userFullName(getUserById(advertisement.user.id))
                            )}
                          </Tag>
                        </Link>
                      </Flex>
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
