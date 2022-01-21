import React, { useRef, useEffect, useCallback } from "react";
import { Overlay, StyledX, Content } from "./styles";

export const Modal = ({ showModal, setShowModal, openModal, children }) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <Overlay ref={modalRef} onClick={closeModal}>
      <StyledX onClick={openModal} />
      <Content>{children}</Content>
    </Overlay>
  );
};
