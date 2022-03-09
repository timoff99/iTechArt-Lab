import React from "react";
import styled from "styled-components";
import { ROUTE_NAMES } from "../../../../router/routeNames";

import { Box } from "../../../helpers/Box";
import { Li, Ul } from "../../../helpers/List";
import { LinkRenderer } from "../../../helpers/Text";

const StyledMenu = styled(Box)`
  display: ${({ open }) => (open ? "flex" : "none")};
  position: absolute;
  top: 40px;
  left: -18px;
  background: white;
  padding-left: 0;
  border-radius: 10px;
`;

export const Menu = ({ open, as }) => {
  return (
    <StyledMenu as={as} open={open}>
      <Ul textAlign="left" pl={0}>
        <Li p={2}>
          <LinkRenderer fontSize={1} href={ROUTE_NAMES.SEARCHTABRECIPES} color="secondary.main" inline>
            Recipes
          </LinkRenderer>
        </Li>
        <Li p={2}>
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
