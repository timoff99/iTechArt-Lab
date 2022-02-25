import React, { useState } from "react";

import { useUrl } from "../hooks/useUrl";
import { useGetFilteredCookBookQuery, useLazyGetCookBookQuery } from "../services/cookbook.service";
import { CookBookCard } from "../shared/ui-kit/CookBookCard";
import { Modal } from "../shared/ui-kit/Modal";
import { CookBook } from "../shared/ui-kit/ModalContent/CookBook";

export const SearchCookBookCard = () => {
  const [showModal, setShowModal] = useState(false);
  const { query } = useUrl();
  const type = query.type || "";
  const sort = query.sort || "";
  const { data } = useGetFilteredCookBookQuery({ type, sort });
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
          return (
            <CookBookCard openCookBook={openCookBook} key={index} spanList={[4, 9, 4]} {...props} search={"search"} />
          );
        })}
      {showModal && (
        <Modal showModal={showModal} setShowModal={toggleModal}>
          <CookBook {...cookBook} />
        </Modal>
      )}
    </>
  );
};
