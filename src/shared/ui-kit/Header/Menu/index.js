import React from "react";
import styled from "styled-components";

import { ROUTE_NAMES } from "../../../../router/routeNames";
import theme from "../../../../theme";
import { Box } from "../../../helpers/Box";
import { Li, Ul } from "../../../helpers/List";
import { LinkRenderer } from "../../../helpers/Text";

const StyledMenu = styled(Box)`
  display: ${({ open }) => (open ? "flex" : "none")};
  position: absolute;
  top: 60px;
  left: 10px;
  background: white;
  box-shadow: 0px 0px 5px 2px ${theme.colors.background.dark};
  border-radius: 10px;
`;

export const Menu = ({ open, setOpen, as }) => {
  return (
    <StyledMenu as={as} open={open}>
      <Ul textAlign="center" pl={0} width="96vw">
        <Li p={2} onClick={() => setOpen(false)}>
          <LinkRenderer fontSize={1} href={ROUTE_NAMES.SEARCHTABRECIPES} color="secondary.main" inline>
            Recipes
          </LinkRenderer>
        </Li>
        <Li p={2} onClick={() => setOpen(false)}>
          <LinkRenderer fontSize={1} href={ROUTE_NAMES.SEARCHTABCOOKBOOKS} color="secondary.main" inline>
            Cookbooks
          </LinkRenderer>
        </Li>
      </Ul>
    </StyledMenu>
  );
};

Menu.defaultProps = {
  as: "nav",
};
