import React from "react";
import { IconAction, Space, VirtualizedList } from "../../components";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import List from "antd/lib/list";
import Checkbox from "antd/lib/checkbox";
import styled from "styled-components";
import { capitalize, concat } from "lodash";
import Tag from "antd/lib/tag";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Flex } from "antd";

export const AdvertisementsList = ({
  advertisements,
  companies,
  selectedAdvertisements,
  onSetSelectedAdvertisements,
  onEditAdvertisement,
  onDeleteAdvertisement,
  currentScreenWidth,
}) => {
  const isProductSelected = (product) =>
    !!selectedAdvertisements.find(
      (selectedProduct) => selectedProduct.id === product.id
    );

  const onChangeProduct = (event, product) =>
    onSetSelectedAdvertisements(
      event.target.checked
        ? concat(selectedAdvertisements, product)
        : selectedAdvertisements.filter(
            (selectedProduct) => selectedProduct.id !== product.id
          )
    );

  const isNewProduct = (createAt) =>
    dayjs(createAt.toDate()).add(1, "week").isAfter(dayjs());

  const findCompanyById = (companyId) =>
    companies.find((company) => company.id === companyId);

  return (
    <>
      <VirtualizedList
        dataSource={advertisements}
        rowHeight={currentScreenWidth < 750 ? 170 : 105}
        renderItem={(advertisement) => (
          <ProductItem
            actions={[
              <IconAction
                key="edit_advertisement"
                onClick={() => onEditAdvertisement(advertisement)}
                icon={faEdit}
              />,
              // <IconAction
              //   key="observation_advertisement"
              //   onClick={() => {
              //   }}
              //   styled={
              //     !isEmpty(advertisement?.observations)
              //       ? { color: () => "rgb(241, 13, 13)" }
              //       : {}
              //   }
              //   icon={faEye}
              // />,
              <IconAction
                key="delete_advertisement"
                onClick={() => onDeleteAdvertisement(advertisement)}
                icon={faTrashAlt}
                styled={{
                  color: () => "rgb(241, 13, 13)",
                }}
              />,
            ]}
          >
            <List.Item.Meta
              title={
                <Space align="center" size="middle">
                  <Checkbox
                    checked={isProductSelected(advertisement)}
                    onChange={(event) => onChangeProduct(event, advertisement)}
                  />
                  {advertisement.active ? (
                    <Tag color="success">Activado</Tag>
                  ) : (
                    <Tag color="default">Desactivado</Tag>
                  )}
                  <Flex dir="row" gap={10}>
                    <div className="item-title">
                      <h5
                        className="link-color"
                        onClick={() => onEditAdvertisement(advertisement)}
                      >
                        {capitalize(
                          advertisement?.advertisementSetup?.detail?.name
                        )}
                      </h5>
                      {isNewProduct(advertisement.createAt) && (
                        <Tag color="green" style={{ padding: "0 .3em" }}>
                          Nuevo
                        </Tag>
                      )}
                    </div>
                    <div>
                      <Link
                        to={`/companies/${advertisement?.advertisementSetup?.detail?.companyId}`}
                      >
                        <Tag color="blue">
                          {capitalize(
                            findCompanyById(
                              advertisement?.advertisementSetup?.detail
                                ?.companyId
                            )?.commercialName
                          )}
                        </Tag>
                      </Link>
                    </div>
                  </Flex>
                </Space>
              }
            />
          </ProductItem>
        )}
      />
    </>
  );
};

const ProductItem = styled(List.Item)`
  position: relative;
  background: ${({ theme }) => theme.colors.white};
  box-sizing: border-box;
  transition: all ease-in-out 80ms;
  border-radius: ${({ theme }) => theme.border_radius.medium};
  border: 1px solid #e4e4e4;
  width: 100%;
  margin: 0;
  padding: 1em;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  &:hover {
    border: 1px solid #dadce0;
    box-sizing: border-box;
  }
`;
