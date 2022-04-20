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

export const BORDER_RADIUS = 10;

export const space = [
  "0", // 0
  "4px", // 1:
  "8px", // 2:
  "12px", // 3:
  "14px", // 4:
  "16px", // 5:
  "18px", // 6:
  "20px", // 7:
  "24px", // 8:
  "32px", // 9:
  "36px", // 10:
  "56px", // 11:
  "64px", // 12:
  "100px", // 13:
  "200px", // 14:
];

export const fontSizes = [
  "14px", // 0:
  "16px", // 1:
  "18px", // 2:
  "20px", // 3:
  "40px", // 4:
];

/* Standardizing line-heights across fonts */
export const lineHeights = [1, 1.125, 1.25, 1.5];

export const letterSpacings = ["0", "0.025em", "0.05em", "0.075em", "0.1em", "0.15em"];

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
    grey: "#BFBFBF",
    dialog: "#757575",
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
