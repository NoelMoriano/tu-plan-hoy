import React, { createContext, useContext, useState } from "react";
import { Modal } from "../../../components";
import styled, { css } from "styled-components";

const ModalContext = createContext({
  onShowModal: () => console.log(),
  onCloseModal: () => console.log(),
});

export const ModalProviderAdvertisement = ({ children, dataSource }) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalProps, setModalProps] = useState();

  const onShowModal = (modalProps) => {
    setVisibleModal(true);
    setModalProps(modalProps);
  };

  const onCloseModal = () => {
    setVisibleModal(false);
    setModalProps(undefined);
  };

  return (
    <ModalContext.Provider value={{ onShowModal, onCloseModal }}>
      {children}
      <ModalContainer
        open={visibleModal}
        onCancel={onCloseModal}
        title={modalProps?.title}
        closable
        width={modalProps?.width}
        height={modalProps?.height}
        centered={modalProps?.centered || false}
        destroyOnClose
        padding={modalProps?.padding || 10}
        footer={false}
        style={{
          top: modalProps?.top || 20,
          overflow: "hidden",
          padding: modalProps?.padding || 10,
        }}
      >
        {modalProps?.onRenderBody && modalProps.onRenderBody(dataSource)}
      </ModalContainer>
    </ModalContext.Provider>
  );
};

export const useModalAdvertisement = () => useContext(ModalContext);

const ModalContainer = styled(Modal)`
  top: 0 !important;
  ${({ isMobile }) => css`
    width: ${isMobile ? "100%" : "70%"} !important;
  `}
`;
