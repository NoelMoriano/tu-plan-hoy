import React from "react";
import { Button, Image, Space } from "../../../components/ui";
import { Col, Row, Tag } from "antd";
import dayjs from "dayjs";
import Title from "antd/lib/typography/Title";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { youTubeGetId } from "../../../utils";
import { restrictions } from "../../../data-list/index.js";

export const InformationDetailView = ({
  advertisement,
  categories,
  companies,
  onShowModalDetail,
}) => {
  const { advertisementSetup } = advertisement;
  const { detail } = advertisementSetup;

  const findCompanyById = (companyId) =>
    companies.find((company) => company.id === companyId);

  const filterCategories = () =>
    categories.filter((category) =>
      (detail?.categoryIds || "").includes(category.id)
    );

  const restriction = restrictions.find(
    (restriction) => restriction.id === detail.restriction
  );

  return (
    <Row gutter={[16, 16]}>
      <Col span={20} md={22}>
        <Title level={4}>Detalle del anuncio</Title>
      </Col>
      <Col span={4} md={2}>
        <Button type="primary" onClick={onShowModalDetail}>
          Editar
        </Button>
      </Col>
      {detail && (
        <Col span={24} md={12}>
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
                  {dayjs(detail.startDate, "DD-MM-YYYY").format("DD MMM YYYY")}
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
            <div className="white-space">
              <span>Descripción: </span> <br />
              <p className="white-space">{detail.description}</p>
            </div>
            <div className="white-space">
              <span>Restricción: </span>
              <Tag color={restriction.color}>{restriction?.value}</Tag>
            </div>
          </Space>
        </Col>
      )}
      <Col span={24} md={12}>
        <div
          style={{
            width: "17em",
            display: "grid",
            gap: "1em",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <Image
            src={
              advertisementSetup?.adImage?.thumbUrl ||
              advertisementSetup?.adImage?.url ||
              "/avatar.webp"
            }
            className="ad-img w-full h-full"
            alt="Imagen del anuncio"
            style={{
              objectFit: "contain",
              margin: "auto",
            }}
          />
          <div
            className="video-card overflow-hidden rounded-[10px]"
            style={{
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <LiteYouTubeEmbed
              id={youTubeGetId(advertisementSetup?.adVideoUrl)}
              adNetwork={true}
              title="La mejor musica en bizarro"
              iframeClass="w-full h-full"
              poster="maxresdefault"
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};
