import React, { useState, useEffect } from "react";

import { useLazyGetCookBookQuery, useLazyGetFilteredCookBookQuery } from "../services/cookbook.service";
import { Box } from "../shared/helpers/Box";
import { Grid } from "../shared/helpers/Grid";
import { CookBookCard } from "../shared/ui-kit/CookBookCard";
import { Modal } from "../shared/ui-kit/Modal";
import { CookBook } from "../shared/ui-kit/ModalContent/CookBook";
import { Pagination } from "../shared/ui-kit/Pagination";

export const SearchCookBookCard = ({ query }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const type = query.type || "";
  const sort = query.sort || "";
  const search = query.search || "";
  const [filteredCookBooksAction, { data }] = useLazyGetFilteredCookBookQuery();
  const [action, { data: cookBook }] = useLazyGetCookBookQuery();
  useEffect(() => {
    filteredCookBooksAction({ type, sort, search, page: currentPage }, true);
  }, [type, sort, search, currentPage]);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const openCookBook = (_id) => {
    action(_id, true);
    toggleModal();
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <Box>
      <Grid nested mt={11}>
        {data?.sorted &&
          data?.sorted.map((props, index) => {
            return (
              <CookBookCard openCookBook={openCookBook} key={index} spanList={[4, 9, 4]} {...props} search={"search"} />
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
