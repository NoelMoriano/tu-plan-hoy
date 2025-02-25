import React, { useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { useNavigate, useParams } from "react-router";
import Title from "antd/lib/typography/Title";
import Divider from "antd/lib/divider";
import { Button, Space, Spinner, Tag } from "../../../components/ui";
import { useDevice } from "../../../hooks";
import { currentConfig } from "../../../firebase";
import { useGlobalData } from "../../../providers";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { isUndefined } from "lodash";
import { CreateNewAdvertisement } from "./CreateNewAdvertisement.jsx";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { advertisementsRef } from "../../../firebase/collections";
import {
  ModalProviderAdvertisement,
  useModalAdvertisement,
} from "./ModalProviderAdvertisement.jsx";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { InformationDetailView } from "./InformationDetail.View.jsx";
import { PermissionsView } from "./Permissions.View.jsx";
import { InformationDetailModal } from "./informationDetail.Modal.jsx";
import { PermissionsModal } from "./Permissions.Modal.jsx";
import { LocationView } from "./Location.View.jsx";
import { LocationModal } from "./Location.Modal.jsx";

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

  const onRedirectToAdvertisement = () => {
    const url = `${currentConfig.publicHostingUrl}/ads/${currentAdvertisement.nameId}`;

    window.open(url, "_blank");
  };

  const onGoBack = () => navigate(-1);

  if (isLoadingAdvertisement) return <Spinner height="80vh" />;

  return (
    <ModalProviderAdvertisement>
      <Advertisement
        isMobile={isMobile}
        isTablet={isTablet}
        currentAdvertisement={currentAdvertisement}
        companies={companies}
        categories={categories}
        onSetCurrentAdvertisement={onSetCurrentAdvertisement}
        onRedirectToAdvertisement={onRedirectToAdvertisement}
        onGoBack={onGoBack}
      />
    </ModalProviderAdvertisement>
  );
};

const Advertisement = ({
  isMobile,
  isTablet,
  currentAdvertisement,
  companies,
  categories,
  onSetCurrentAdvertisement,
  onRedirectToAdvertisement,
  onGoBack,
}) => {
  const { onShowModal, onCloseModal } = useModalAdvertisement();

  const onShowModalDetail = () => {
    onShowModal({
      title: "Datos del anuncio",
      width: `${isTablet ? "100%" : "50%"}`,
      onRenderBody: () => (
        <InformationDetailModal
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

  const onShowModalPermissions = () => {
    onShowModal({
      title: "Permisos",
      width: `${isTablet ? "100%" : "50%"}`,
      onRenderBody: () => (
        <PermissionsModal
          currentAdvertisement={currentAdvertisement}
          onSetCurrentAdvertisement={onSetCurrentAdvertisement}
          onCancel={onCloseModal}
        />
      ),
    });
  };

  const onShowModalLocation = () => {
    onShowModal({
      title: "Ubicación",
      width: `${isTablet ? "100%" : "50%"}`,
      onRenderBody: () => (
        <LocationModal
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
            <Space
              align="horizontal"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div>
                <Tag
                  color={currentAdvertisement?.active ? "green" : "red"}
                  style={{ margin: "auto" }}
                >
                  {currentAdvertisement?.active ? "Activado" : "Desactivado"}
                </Tag>
              </div>
              <Title level={3} style={{ margin: "auto" }}>
                {currentAdvertisement?.advertisementSetup?.detail?.name ||
                  "Anuncio sin nombre"}
              </Title>
              <Button
                type="primary"
                onClick={() => onRedirectToAdvertisement()}
              >
                <FontAwesomeIcon icon={faEye} />
                &nbsp; Ver
              </Button>
            </Space>
          </Col>
          <Divider />
          <Col span={24}>
            <InformationDetailView
              advertisement={currentAdvertisement}
              categories={categories}
              companies={companies}
              onShowModalDetail={onShowModalDetail}
            />
          </Col>
          <Divider />
          <Col span={24}>
            <PermissionsView
              currentAdvertisement={currentAdvertisement}
              onShowModalPermissions={onShowModalPermissions}
            />
          </Col>
          <Divider />
          <Col span={24}>
            <LocationView
              currentAdvertisement={currentAdvertisement}
              onShowModalLocation={onShowModalLocation}
            />
          </Col>
        </>
      ) : (
        <CreateNewAdvertisement
          companies={companies}
          categories={categories}
          isMobile={isMobile}
          onGoBack={onGoBack}
        />
      )}
    </Row>
  );
};
