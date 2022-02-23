import React, { useState } from "react";

import { useLazyGetCookBookQuery, useGetUserCookBooksQuery } from "../../services/cookbook.service";
import { CookBookCard } from "../../shared/ui-kit/CookBookCard";
import { Modal } from "../../shared/ui-kit/Modal";
import { CookBook } from "../../shared/ui-kit/ModalContent/CookBook";

export const CookBookTab = () => {
  const [showModal, setShowModal] = useState(false);

  const { data } = useGetUserCookBooksQuery();
  const [action, { data: cookBook }] = useLazyGetCookBookQuery();

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const openCookBook = (_id) => {
    action(_id, true);
    toggleModal();
  };

  return (
    <>
      {data &&
        data.map((props, index) => {
          return <CookBookCard openCookBook={openCookBook} key={index} spanList={[4, 6, 3]} {...props} />;
        })}
      {showModal && (
        <Modal showModal={showModal} setShowModal={toggleModal}>
          <CookBook {...cookBook} />
        </Modal>
      )}
    </>
  );
};
