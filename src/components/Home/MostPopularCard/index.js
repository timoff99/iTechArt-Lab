import React, { useState } from "react";

import { useAddCookBookCloneMutation } from "../../../services/cookbook.service";
import { Paragraph } from "../../../shared/helpers/Text";
import { Button } from "../../../shared/ui-kit/Button";
import { ReactComponent as Options } from "../../../static/icons/options.svg";
import { StyledButton, RelativeCard, BoxGradient, OptionMenu, StyledOptions } from "./styles";

export const MostPopularCard = ({ items, variant, openCookBook, pt }) => {
  const [optionMenu, setOptionMenu] = useState(false);

  const [addCookBookClone] = useAddCookBookCloneMutation();

  const handleOption = (e) => {
    e.stopPropagation();
    setOptionMenu((prev) => !prev);
  };

  const handleClick = (e, items) => {
    e.preventDefault();
    openCookBook(items._id);
  };

  const onClone = async (e, setOptionMenu, items) => {
    e.stopPropagation();
    addCookBookClone(items._id);
    setOptionMenu(false);
  };

  return (
    <RelativeCard bg={items?.image} pt={pt}>
      <BoxGradient>
        <StyledButton ml={8} mb={8} alignSelf="flex-end" variant={variant} onClick={(e) => handleClick(e, items)}>
          <Paragraph fontWeight={"normal"} fontSize={[2, 0, 2]} overflow="hidden" height="20px">
            {items?.title}
          </Paragraph>
        </StyledButton>
        <StyledOptions onClick={(e) => handleOption(e)}>
          <Options />
          {optionMenu && (
            <OptionMenu>
              <Button
                variant="secondary"
                variantMenu="secondaryMenu"
                size="box"
                onClick={(e) => onClone(e, setOptionMenu, items)}
              >
                <Paragraph as={"pre"} fontWeight={"normal"}>
                  Clone to My CookBooks
                </Paragraph>
              </Button>
            </OptionMenu>
          )}
        </StyledOptions>
      </BoxGradient>
    </RelativeCard>
  );
};
