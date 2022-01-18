export const breakpointsAsInts = [768, 1220];

/* The breakpoints we use */
export const breakpoints = breakpointsAsInts.map((bp) => `${bp}px`);

/* Defining media queries for use as props */
export const mediaQueries = {
  small: `@media screen and (max-width: ${breakpoints[0]})`,
  medium: `@media screen and (min-width: ${breakpoints[0]})`,
  large: `@media screen and (min-width: ${breakpoints[1]})`,
};

export const GUTTER = 24;

export const GRID_COLS = [4, 12, 12];

export const space = [
  "0",
  // 0:
  "4px",
  // 1:
  "8px",
  // 2:
  "12px",
  // 3:
  "14x",
  // 4:
  "16px",
  // 5:
  "20px",
  // 6:
  "24px",
  // 7:
  "32px",
  // 8:
  "36px",
  // 9:
  "56px",
  // 10:
  "64px",
  // 11:
  "100px",
  // 12:
  "200px",
  // 13:
];

export const fontSizes = [
  "14px",
  // 0:
  "18px",
  // 1:
  "20px",
  // 2:
  "40px",
  // 3:
];

/* Standardizing line-heights across fonts */
export const lineHeights = [1, 1.125, 1.25, 1.5];

export const letterSpacings = [
  "0",
  "0.025em",
  "0.05em",
  "0.075em",
  "0.1em",
  "0.15em",
];

/* Max-widths based on breakpoints */
export const maxWidths = [433, 740, 1248, 1680];

export const colors = {
  primary: {
    main: "#FFBC01",
  },
  secondary: {
    main: "#181818",
    light: "#494949",
  },
  background: {
    main: "#FFFFFF",
    light: "#F7F7F7",
    dark: "#EDEDED",
    contrast: "#DADADA",
  },
};

export const fonts = {
  header: "Montserrat",
  paragraph: "Nunito",
};

const theme = {
  fonts,
  breakpoints,
  mediaQueries,
  space,
  colors,
  maxWidths,
  fontSizes,
  lineHeights,
  letterSpacings,
};

export default theme;
