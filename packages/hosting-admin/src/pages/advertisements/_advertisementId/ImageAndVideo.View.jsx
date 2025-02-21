import React from "react";
import Col from "antd/lib/col/index.js";
import Title from "antd/lib/typography/Title.js";
import { Button, Image } from "../../../components/ui/index.js";
import { Flex } from "antd";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { youTubeGetId } from "../../../utils/index.js";
import Row from "antd/lib/row/index.js";

export const ImageAndVideoView = ({
  currentAdvertisement,
  onShowModalImageAndVideo,
}) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={20} md={22}>
        <Title level={4}>Imagen y video</Title>
      </Col>
      <Col span={4} md={2}>
        <Button type="primary" onClick={onShowModalImageAndVideo}>
          Editar
        </Button>
      </Col>
      <Col span={24} sm={12}>
        <Flex
          justify="center"
          align="center"
          style={{ width: "100%", height: "100%" }}
        >
          <Image
            src={
              currentAdvertisement?.advertisementSetup?.adImage?.thumbUrl ||
              currentAdvertisement?.advertisementSetup?.adImage?.url ||
              "/avatar.webp"
            }
            className="ad-img w-full h-full"
            alt="Imagen del anuncio"
            style={{
              objectFit: "contain",
              margin: "auto",
            }}
          />
        </Flex>
      </Col>
      <Col span={24} sm={12}>
        <div
          className="video-card overflow-hidden rounded-[10px]"
          style={{ margin: "auto" }}
        >
          <LiteYouTubeEmbed
            id={youTubeGetId(
              currentAdvertisement?.advertisementSetup?.adVideoUrl
            )}
            adNetwork={true}
            title="La mejor musica en bizarro"
            iframeClass="w-full h-full"
            poster="maxresdefault"
          />
        </div>
      </Col>
    </Row>
  );
};
