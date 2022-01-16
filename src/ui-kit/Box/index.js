import styled from "styled-components";
import {
  space,
  border,
  typography,
  color,
  layout,
  flexbox,
  compose,
  position,
  shadow,
  background,
} from "styled-system";
import theme from "../../theme";

export const Box = styled("div")(
  {
    boxSizing: "border-box",
    margin: 0,
    minWidth: 0,
    fontFamily: `${theme.fonts.nunito}`,
  },
  compose(
    space,
    layout,
    typography,
    color,
    border,
    flexbox,
    position,
    shadow,
    background
  )
);
