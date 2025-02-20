import React from "react";
import Col from "antd/lib/col";
import { Space } from "../../../components/ui";
import { Row, Tag } from "antd";
import dayjs from "dayjs";

export const AdvertisementDetailView = ({
  advertisement,
  categories,
  companies,
}) => {
  const { advertisementSetup } = advertisement;
  const { detail } = advertisementSetup;

  const findCompanyById = (companyId) =>
    companies.find((company) => company.id === companyId);

  const filterCategories = () =>
    categories.filter((category) =>
      (detail?.categoryIds || "").includes(category.id)
    );

  return (
    <Row gutter={[16, 16]}>
      {detail && (
        <>
          <Col span={24}>
            <Space direction="vertical">
              <div className="white-space">
                <span>Nombre: </span>
                <strong>{detail.name}</strong>
              </div>
              <div className="white-space">
                <span>Empresa: </span>
                <strong>
                  {findCompanyById(detail.companyId)?.commercialName}
                </strong>
              </div>
              <div className="white-space">
                <Space size="small" wrap>
                  <span>Categorias: </span>
                  {filterCategories().map((category) => (
                    <Tag color="blue">{category.name}</Tag>
                  ))}
                </Space>
              </div>
              <div className="white-space">
                <span>Fecha y hora de inicio: </span>
                <Space wrap>
                  <strong>
                    {dayjs(detail.startDate, "DD-MM-YYYY").format(
                      "DD MMM YYYY"
                    )}
                  </strong>
                  a las
                  <strong>
                    {dayjs(detail.startTime, "HH:mm").format("HH:mm")}
                  </strong>
                </Space>
              </div>
              <div className="white-space">
                <span>Fecha y hora de finalización: </span>
                <Space wrap>
                  <strong>
                    {dayjs(detail.endDate, "DD-MM-YYYY").format("DD MMM YYYY")}
                  </strong>
                  a las
                  <strong>
                    {dayjs(detail.endTime, "HH:mm").format("HH:mm")}
                  </strong>
                </Space>
              </div>
            </Space>
          </Col>
        </>
      )}
    </Row>
  );
};
