import React, { useState, useEffect } from "react";

import { useLazyGetCookBookQuery, useLazyGetUserCookBooksQuery } from "../../services/cookbook.service";
import { Box } from "../../shared/helpers/Box";
import { Grid } from "../../shared/helpers/Grid";
import { Pagination } from "../../shared/ui-kit/Pagination";
import { CookBookCard } from "../../shared/ui-kit/CookBookCard";
import { Modal } from "../../shared/ui-kit/Modal";
import { CookBook } from "../../shared/ui-kit/ModalContent/CookBook";

export const CookBookTab = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const [userCookBooksAction, { data }] = useLazyGetUserCookBooksQuery();
  const [cookBookAction, { data: cookBook }] = useLazyGetCookBookQuery();

  useEffect(() => {
    userCookBooksAction(currentPage, true);
  }, [currentPage]);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const openCookBook = (_id) => {
    cookBookAction({ _id }, true);
    toggleModal();
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  return (
    <Box display="flex" flexDirection="column">
      <Grid nested mb={11}>
        {data?.cookBook &&
          data?.cookBook.map((props, index) => {
            return (
              <CookBookCard
                openCookBook={openCookBook}
                key={index}
                spanList={[4, 6, 3]}
                {...props}
                profile={"profile"}
              />
            );
          })}
      </Grid>
      {data?.totalPages > 1 && <Pagination totalPages={data?.totalPages} handlePageClick={handlePageClick} />}

      {showModal && (
        <Modal showModal={showModal} setShowModal={toggleModal}>
          <CookBook {...cookBook} />
        </Modal>
      )}
    </Box>
  );
};
