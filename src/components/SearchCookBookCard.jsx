import React, { useState, useEffect } from "react";

import {
  useLazyGetCookBookQuery,
  useLazyGetCookBookWithoutViewsPlusOneQuery,
  useLazyGetFilteredCookBookQuery,
} from "../services/cookbook.service";

import { Box } from "../shared/helpers/Box";
import { Grid } from "../shared/helpers/Grid";
import { Col } from "../shared/helpers/Grid/Col";
import { Heading } from "../shared/helpers/Text";
import { CookBookCard } from "../shared/ui-kit/CookBookCard";
import { Loader } from "../shared/ui-kit/Loader";
import { Modal } from "../shared/ui-kit/Modal";
import { CookBook } from "../shared/ui-kit/ModalContent/CookBook";
import { Pagination } from "../shared/ui-kit/Pagination";
import { colors } from "../theme";

export const SearchCookBookCard = ({ query }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const type = query.type || "";
  const sort = query.sort || "";
  const search = query.search || "";
  const [filteredCookBooksAction, { data }] = useLazyGetFilteredCookBookQuery();
  const [action, { data: cookBook }] = useLazyGetCookBookQuery();
  const [actionGetCookBookWithoutViewsPlusOneQuery, { data: cookBookWithoutViewsPlusOneQuery }] =
    useLazyGetCookBookWithoutViewsPlusOneQuery();

  const refreshCookbooks = () => {
    filteredCookBooksAction({ type, sort, search, page: currentPage });
  };

  const getCookBookWithoutViewsPlusOneQuery = async (_id) => {
    await actionGetCookBookWithoutViewsPlusOneQuery({ _id });
  };

  useEffect(() => {
    refreshCookbooks();
  }, [type, sort, search, currentPage, cookBook]);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const openCookBook = async (_id) => {
    await action({ _id }, true);
    toggleModal();
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const checkCookbook = () => {
    if (cookBookWithoutViewsPlusOneQuery?._id === cookBook?._id) {
      return cookBookWithoutViewsPlusOneQuery;
    } else {
      return cookBook;
    }
  };

  return (
    <Box>
      <Grid nested mt={11}>
        {data?.sorted ? (
          data?.sorted.map((props, index) => {
            return (
              <CookBookCard openCookBook={openCookBook} key={index} spanList={[4, 6, 4]} {...props} search={"search"} />
            );
          })
        ) : (
          <Col display="flex" justifyContent="center">
            <Loader color={colors.primary.main} height={"lg"} width={"lg"} />
          </Col>
        )}
      </Grid>
      {data?.sorted.length === 0 && (
        <Box display="flex" justifyContent="center">
          <Heading as={"h3"}>Empty Page</Heading>
        </Box>
      )}
      {data?.totalPages > 1 && <Pagination totalPages={data?.totalPages} handlePageClick={handlePageClick} />}

      {showModal && (
        <Modal showModal={showModal} setShowModal={toggleModal}>
          <CookBook
            {...checkCookbook()}
            refreshCookbooks={refreshCookbooks}
            getCookBookWithoutViewsPlusOneQuery={getCookBookWithoutViewsPlusOneQuery}
          />
        </Modal>
      )}
    </Box>
  );
};
