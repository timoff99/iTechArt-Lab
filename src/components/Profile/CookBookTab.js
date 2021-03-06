import React, { useState, useEffect } from "react";

import {
  useLazyGetCookBookQuery,
  useLazyGetCookBookWithoutViewsPlusOneQuery,
  useLazyGetUserCookBooksQuery,
} from "../../services/cookbook.service";

import { Box } from "../../shared/helpers/Box";
import { Grid } from "../../shared/helpers/Grid";
import { Pagination } from "../../shared/ui-kit/Pagination";
import { CookBookCard } from "../../shared/ui-kit/CookBookCard";
import { Modal } from "../../shared/ui-kit/Modal";
import { CookBook } from "../../shared/ui-kit/ModalContent/CookBook";
import { Loader } from "../../shared/ui-kit/Loader";
import { Col } from "../../shared/helpers/Grid/Col";
import { colors } from "../../theme";
import { Heading } from "../../shared/helpers/Text";

export const CookBookTab = ({ query }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const search = query.search || "";

  const [userCookBooksAction, { data }] = useLazyGetUserCookBooksQuery();
  const [cookBookAction, { data: cookBook }] = useLazyGetCookBookQuery();

  const [actionGetCookBookWithoutViewsPlusOneQuery, { data: cookBookWithoutViewsPlusOneQuery }] =
    useLazyGetCookBookWithoutViewsPlusOneQuery();

  const getCookBookWithoutViewsPlusOneQuery = async (_id) => {
    await actionGetCookBookWithoutViewsPlusOneQuery({ _id });
  };

  const refreshCookbooks = () => {
    userCookBooksAction({ page: currentPage, search });
  };

  useEffect(() => {
    refreshCookbooks();
  }, [currentPage, search, cookBook]);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const openCookBook = async (_id) => {
    await cookBookAction({ _id }, true);
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
    <Box display="flex" flexDirection="column">
      <Grid nested mb={11}>
        {data?.cookBook ? (
          data?.cookBook.map((props, index) => {
            return (
              <CookBookCard
                openCookBook={openCookBook}
                key={index}
                spanList={[4, 6, 3]}
                {...props}
                cookbookProfile={"cookbookProfile"}
              />
            );
          })
        ) : (
          <Col display="flex" justifyContent="center">
            <Loader color={colors.primary.main} height={"lg"} width={"lg"} />
          </Col>
        )}
      </Grid>
      {data?.cookBook.length === 0 && (
        <Box display="flex" justifyContent="center">
          <Heading as={"h3"}>Create your first Cookbook</Heading>
        </Box>
      )}
      {data?.totalPages > 1 && <Pagination totalPages={data?.totalPages} handlePageClick={handlePageClick} />}

      {showModal && (
        <Modal showModal={showModal} setShowModal={toggleModal}>
          <CookBook
            {...checkCookbook()}
            cookbookProfile={"cookbookProfile"}
            refreshCookbooks={refreshCookbooks}
            getCookBookWithoutViewsPlusOneQuery={getCookBookWithoutViewsPlusOneQuery}
          />
        </Modal>
      )}
    </Box>
  );
};
