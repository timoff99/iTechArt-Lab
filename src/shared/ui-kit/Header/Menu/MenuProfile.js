import Cookies from "js-cookie";
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
  top: 40px;
  width: 100%;
  left: -14px;
  background: white;
  box-shadow: 0px 0px 5px 2px ${theme.colors.background.dark};
  border-radius: 10px;
`;

export const MenuProfile = ({ open, setOpen, as }) => {
  return (
    <StyledMenu as={as} open={open}>
      <Ul textAlign="center" pl={0} width={"100%"}>
        <Li p={2} onClick={() => setOpen(false)}>
          <LinkRenderer href={ROUTE_NAMES.PROFILETABCOOKBOOKS} color="secondary.main" inline>
            Profile
          </LinkRenderer>
        </Li>
        <Li p={2} onClick={() => Cookies.remove("token")}>
          <LinkRenderer href={ROUTE_NAMES.LOGIN} color="secondary.main" inline>
            Logout
          </LinkRenderer>
        </Li>
      </Ul>
    </StyledMenu>
  );
};

MenuProfile.defaultProps = {
  as: "nav",
};
