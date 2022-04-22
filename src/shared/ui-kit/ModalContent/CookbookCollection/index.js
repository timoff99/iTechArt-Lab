import React, { useState } from "react";

import { Box } from "../../../helpers/Box";
import { FlexColumn, Flex } from "../../../helpers/Flex";
import { Heading } from "../../../helpers/Text";
import { HorizontalCard } from "../../HorizontalCard";
import { Modal } from "../../Modal";
import { CookBook } from "../CookBook";
import { Loader } from "../../Loader";
import { colors } from "../../../../theme";

import { useLazyGetCookBookQuery } from "../../../../services/cookbook.service";

export const CookbookCollection = ({ collection_arr, title, refreshCookbooks, currentCollection }) => {
  const [showModal, setShowModal] = useState(false);
  const [action, { data: cookbook }] = useLazyGetCookBookQuery();
  const withoutTag = true;
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const getCookBook = async (_id, caching) => {
    await action({ _id }, caching);
  };

  const openCookbook = async (_id) => {
    await getCookBook(_id, true);
    toggleModal();
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
            {...cookbook}
            withoutTag={withoutTag}
            refreshCookbooks={refreshCookbooks}
            getCookBook={getCookBook}
            currentCollection={currentCollection}
          />
        </Modal>
      )}
    </Box>
  );
};
