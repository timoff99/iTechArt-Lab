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

export const Box = styled("div")(
  {
    boxSizing: "border-box",
    margin: 0,
    minWidth: 0,
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
