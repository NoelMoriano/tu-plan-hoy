import React, { useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { useNavigate, useParams } from "react-router";
import Title from "antd/lib/typography/Title";
import Divider from "antd/lib/divider";
import { Button, Image, Space, Spinner } from "../../../components/ui";
import { useDevice } from "../../../hooks";
import { currentConfig } from "../../../firebase";
import { useGlobalData } from "../../../providers";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { isUndefined } from "lodash";
import { ManageCreateAdvertisement } from "./ManageCreateAdvertisement.jsx";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { advertisementsRef } from "../../../firebase/collections/index.js";
import {
  ModalProviderAdvertisement,
  useModalProduct,
} from "./ModalProviderAdvertisement.jsx";
import { AdvertisementDetailView } from "./AdvertisementDetailView.jsx";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { Flex } from "antd";
import { ModalContentDetail } from "./ModalContentDetail.jsx";
import { ModalContentImagenAndVideo } from "./ModalContentImagenAndVideo.jsx";
import { ModalContentPermissions } from "./ModalContentPermissions.jsx";
import { UserPermissionsComponent } from "./UserPermissionsView.jsx";
import { youTubeGetId } from "../../../utils/index.js";

export const AdvertisementIntegration = () => {
  const navigate = useNavigate();
  const { advertisementId } = useParams();
  const { isMobile, isTablet } = useDevice();

  const { categories = [], companies = [] } = useGlobalData();

  const [currentAdvertisement, setCurrentAdvertisement] = useState(null);

  const [advertisementFirestore, isLoadingAdvertisement] = useDocumentDataOnce(
    advertisementId !== "new"
      ? advertisementsRef.doc(advertisementId)
      : undefined
  );

  useEffect(() => {
    const _advertisement =
      advertisementId !== "new" ? advertisementFirestore : null;

    if (!isLoadingAdvertisement && isUndefined(_advertisement))
      return onGoBack();

    onSetCurrentAdvertisement(_advertisement);
  }, [isLoadingAdvertisement, advertisementFirestore]);

  const onSetCurrentAdvertisement = (advertisement) =>
    setCurrentAdvertisement(advertisement);

  const onRedirectToProduct = () => {
    const url = `${currentConfig.publicHostingUrl}/products/${currentAdvertisement.nameId}`;

    window.open(url, "_blank");
  };

  const onGoBack = () => navigate(-1);

  if (isLoadingAdvertisement) return <Spinner height="80vh" />;

  return (
    <ModalProviderAdvertisement>
      <Product
        isMobile={isMobile}
        isTablet={isTablet}
        currentAdvertisement={currentAdvertisement}
        companies={companies}
        categories={categories}
        onSetCurrentAdvertisement={onSetCurrentAdvertisement}
        onRedirectToProduct={onRedirectToProduct}
        onGoBack={onGoBack}
      />
    </ModalProviderAdvertisement>
  );
};

const Product = ({
  isMobile,
  isTablet,
  currentAdvertisement,
  companies,
  categories,
  onSetCurrentAdvertisement,
  onRedirectToProduct,
  onGoBack,
}) => {
  const { onShowModal, onCloseModal } = useModalProduct();

  const onShowModalDetail = () => {
    onShowModal({
      title: "Datos del anuncio",
      width: `${isTablet ? "100%" : "50%"}`,
      centered: false,
      top: 0,
      padding: 0,
      footer: false,
      onRenderBody: () => (
        <ModalContentDetail
          isMobile={isMobile}
          currentAdvertisement={currentAdvertisement}
          onSetCurrentAdvertisement={onSetCurrentAdvertisement}
          categories={categories}
          companies={companies}
          onCancel={onCloseModal}
        />
      ),
    });
  };

  const onShowModalImageAndVideo = () => {
    onShowModal({
      title: "Imagen y video",
      width: `${isTablet ? "100%" : "50%"}`,
      centered: false,
      top: 0,
      padding: 0,
      footer: false,
      onRenderBody: () => (
        <ModalContentImagenAndVideo
          currentAdvertisement={currentAdvertisement}
          onSetCurrentAdvertisement={onSetCurrentAdvertisement}
          onCancel={onCloseModal}
        />
      ),
    });
  };

  const onShowModalPermissions = () => {
    onShowModal({
      title: "Permisos",
      width: `${isTablet ? "100%" : "50%"}`,
      centered: false,
      top: 0,
      padding: 0,
      footer: false,
      onRenderBody: () => (
        <ModalContentPermissions
          currentAdvertisement={currentAdvertisement}
          onSetCurrentAdvertisement={onSetCurrentAdvertisement}
          onCancel={onCloseModal}
        />
      ),
    });
  };

  return (
    <Row>
      {currentAdvertisement ? (
        <>
          <Col span={24}>
            <Space align="horizontal">
              <Title level={3}>
                {currentAdvertisement?.advertisementSetup?.detail?.name ||
                  "Producto sin nombre"}
              </Title>
              <Button type="primary" onClick={() => onRedirectToProduct()}>
                <FontAwesomeIcon icon={faEye} />
                &nbsp; Ver
              </Button>
            </Space>
          </Col>
          <Divider />
          <Col span={24}>
            <Row gutter={[16, 16]}>
              <Col span={20} md={22}>
                <Title level={4}>Detalle del anuncio</Title>
              </Col>
              <Col span={4} md={2}>
                <Button type="primary" onClick={onShowModalDetail}>
                  Editar
                </Button>
              </Col>
              <Col span={24}>
                <AdvertisementDetailView
                  advertisement={currentAdvertisement}
                  categories={categories}
                  companies={companies}
                />
              </Col>
            </Row>
          </Col>
          <Divider />
          <Col span={24}>
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
                      currentAdvertisement?.advertisementSetup?.adImage
                        ?.thumbUrl ||
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
              <Divider />
              <UserPermissionsComponent
                isTablet={isTablet}
                currentAdvertisement={currentAdvertisement}
                onShowModalPermissions={onShowModalPermissions}
              />
            </Row>
          </Col>
        </>
      ) : (
        <ManageCreateAdvertisement
          companies={companies}
          categories={categories}
          isMobile={isMobile}
          onGoBack={onGoBack}
        />
      )}
    </Row>
  );
};
