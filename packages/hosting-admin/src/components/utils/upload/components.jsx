import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Button, Modal } from "../../ui";
import React from "react";

export const PreviewFile = ({ url, isImage, onCancel, thumbUrl, visible }) => (
  <ModalStyled
    onCancel={onCancel}
    style={{ textAlign: "center" }}
    visible={visible}
    title="Visualización"
    closable={true}
    centered={true}
    footer={[
      <ButtonStyled
        key="download"
        size="large"
        onClick={() => window.open(thumbUrl, "_blank")}
        icon={<FontAwesomeIcon icon={faDownload} />}
      >
        &ensp; Descargar
      </ButtonStyled>,
    ]}
  >
    {isImage ? (
      <img src={thumbUrl || url} alt="thumbImage" />
    ) : (
      <span>Vista previa solo para imágenes</span>
    )}
  </ModalStyled>
);

const ModalStyled = styled(Modal)`
  img {
    max-width: 100%;
    box-sizing: border-box;
    object-fit: cover;
  }
`;

const ButtonStyled = styled(Button)`
  display: inline-flex;
  align-items: center;
  color: #595e63;

  svg {
    font-size: ${({ theme }) => theme.font_sizes.x_small};
    margin: 0 5px 4px 0;
  }
`;
//
// interface UploadBodyProps {
//   buttonText: string;
//   visible?: boolean;
// }

export const UploadBody = ({ buttonText, visible = true }) =>
  visible ? (
    <Button size="large" block icon={<FontAwesomeIcon icon={faUpload} />}>
      &nbsp; {buttonText}
    </Button>
  ) : null;

// interface UploadDraggerBodyProps {
//   text: string;
//   hint: string;
// }

export const UploadDraggerBody = ({ text, hint }) => (
  <>
    <p className="ant-upload-drag-icon">
      <FontAwesomeIcon icon={faBox} size="2x" />
    </p>
    <p className="ant-upload-text">{text}</p>
    <p className="ant-upload-hint">{hint}</p>
  </>
);
