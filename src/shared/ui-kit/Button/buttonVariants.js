export default (disabled) => ({
  primary: {
    color: "secondary.main",
    bg: "primary.main",
    opacity: disabled ? "0.6" : "1",
  },

  secondary: {
    color: "secondary.main",
    bg: "background.main",
    opacity: disabled ? "0.6" : "1",
  },

  secondaryMenu: {
    bg: "background.dark",
    opacity: disabled ? "0.6" : "1",
  },

  outlined: {
    color: "primary.main",
    bg: "background.main",
    border: "1px solid",
    borderColor: "primary.main",
    opacity: disabled ? "0.6" : "1",
  },

  link: {
    color: "primary.main",
    bg: "background.main",
    opacity: disabled ? "0.6" : "1",
  },
});
