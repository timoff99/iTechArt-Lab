import React, { useState } from "react";

import { Box } from "../../../helpers/Box";
import { FlexColumn, Flex } from "../../../helpers/Flex";
import { Heading } from "../../../helpers/Text";
import { HorizontalCard } from "../../HorizontalCard";
import { Modal } from "../../Modal";
import { CookBook } from "../CookBook";
import { Loader } from "../../Loader";
import { colors } from "../../../../theme";

import {
  useLazyGetCookBookQuery,
  useLazyGetCookBookWithoutViewsPlusOneQuery,
} from "../../../../services/cookbook.service";

export const CookbookCollection = ({ collection_arr, title, refreshCookbooks, currentCollection }) => {
  const [showModal, setShowModal] = useState(false);
  const [action, { data: cookBook }] = useLazyGetCookBookQuery();
  const [actionGetCookBookWithoutViewsPlusOneQuery, { data: cookBookWithoutViewsPlusOneQuery }] =
    useLazyGetCookBookWithoutViewsPlusOneQuery();

  const withoutTag = true;
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };
  const getCookBookWithoutViewsPlusOneQuery = async (_id) => {
    await actionGetCookBookWithoutViewsPlusOneQuery({ _id });
  };

  const openCookbook = async (_id) => {
    await action({ _id }, true);
    toggleModal();
  };

  const checkCookbook = () => {
    if (cookBookWithoutViewsPlusOneQuery?._id === cookBook?._id) {
      return cookBookWithoutViewsPlusOneQuery;
    } else {
      return cookBook;
    }
  };

  return (
    <Box px={[5, 11, 11]} pt={[10, 12, 12]}>
      <Flex
        mb={10}
        flexWrap={"wrap"}
        flexDirection={["column", "row", "row"]}
        justifyContent={["center", "space-between", "space-between"]}
        alignItems={["center", "stretch", "stretch"]}
      >
        <FlexColumn mb={[5, 0, 0]} alignItems={["center", "stretch", "stretch"]}>
          <Heading as={"h2"} bold mb={5} maxWidth={600}>
            {title}
          </Heading>
        </FlexColumn>
      </Flex>

      {collection_arr?.length > 0 ? (
        <>
          <FlexColumn mb={10}>
            {collection_arr.map((props, index) => {
              return <HorizontalCard openRecipe={openCookbook} key={index} collection place={"no-rates"} {...props} />;
            })}
          </FlexColumn>
        </>
      ) : (
        <Box display="flex" justifyContent="center">
          <Loader color={colors.primary.main} height={"lg"} width={"lg"} />
        </Box>
      )}
      {showModal && (
        <Modal showModal={showModal} setShowModal={toggleModal}>
          <CookBook
            {...checkCookbook()}
            withoutTag={withoutTag}
            refreshCookbooks={refreshCookbooks}
            getCookBookWithoutViewsPlusOneQuery={getCookBookWithoutViewsPlusOneQuery}
            currentCollection={currentCollection}
          />
        </Modal>
      )}
    </Box>
  );
};
