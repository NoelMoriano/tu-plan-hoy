import React from "react";
import { Skeleton, Typography } from "antd";
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
} from "../../components/ui";
import { useAuthentication, useGlobalData } from "../../providers";
import { useNavigate } from "react-router";
import { useDevice } from "../../hooks";
import { useApiCompanyPatch } from "../../api";
import { assign, capitalize } from "lodash";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

export const Companies = () => {
  const { isMobile } = useDevice();
  const navigate = useNavigate();
  const { authUser } = useAuthentication();
  const { companies } = useGlobalData();
  const { patchCompany, patchCompanyResponse } = useApiCompanyPatch();

  const navigateTo = (companyId) => {
    const url = `/companies/${companyId}`;
    navigate(url);
  };

  const onAddCompany = () => navigateTo("new");

  const onEditCompany = (company) => navigateTo(company.id);

  const onDeleteCompany = async (company) => {
    const _company = assign({}, company, { updateBy: authUser?.email });

    await patchCompany(_company);

    if (!patchCompanyResponse.ok)
      return notification({
        type: "error",
      });

    notification({
      type: "success",
      title: "Empresa eliminada exitosamente!",
    });
  };

  const onConfirmRemoveCompany = (company) =>
    modalConfirm({
      content: "La empresa se eliminara",
      onOk: async () => {
        await onDeleteCompany(company);
      },
    });

  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        <Flex justify="space-between" wrap="wrap" size="middle">
          <Title level={3}>Empresas</Title>
          <Button
            type="primary"
            onClick={() => onAddCompany()}
            icon={<FontAwesomeIcon icon={faPlus} />}
          >
            Agregar empresa
          </Button>
        </Flex>
      </Col>
      <Col span={24}>
        <ListAntd
          className="demo-loadmore-list"
          loading={false}
          itemLayout={isMobile ? "vertical" : "horizontal"}
          dataSource={companies}
          renderItem={(company) => (
            <ListAntd.Item
              actions={[
                <IconAction
                  key="edit"
                  data-testid="edit"
                  onClick={() => onEditCompany(company)}
                  icon={faEdit}
                />,
                <IconAction
                  key="delete"
                  data-testid="delete"
                  onClick={() => onConfirmRemoveCompany(company)}
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
                        company?.logo?.thumbUrl ||
                        company?.logo?.url ||
                        "/avatar.webp"
                      }
                    />
                  }
                  title={
                    <Link to={`/companies/${company.id}`}>
                      {capitalize(company?.name)}
                    </Link>
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
