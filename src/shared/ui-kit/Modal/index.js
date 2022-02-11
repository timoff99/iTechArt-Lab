import React, { useRef, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { Overlay, StyledX, Content } from "./styles";

const modalRootElement = document.querySelector("#modal");

export const Modal = ({ showModal, setShowModal, children }) => {
  const element = useMemo(() => document.createElement("div"), []);

  const modalRef = useRef();

  const closeModal = (e) => {
    e.stopPropagation();
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

  useEffect(() => {
    modalRootElement.appendChild(element);
    return () => {
      modalRootElement.removeChild(element);
    };
  });
  return createPortal(
    <Overlay ref={modalRef} onClick={closeModal}>
      <StyledX onClick={setShowModal} />
      <Content>{children}</Content>
    </Overlay>,
    element
  );
};
