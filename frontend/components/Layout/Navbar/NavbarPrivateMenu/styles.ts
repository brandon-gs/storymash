import { makeStyles, alpha } from "@material-ui/core"

export default makeStyles(theme => ({
  avatar: {
    height: theme.spacing(5),
    width: theme.spacing(5),
    cursor: "pointer",
  },
  inputSearch: {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    borderRadius: theme.shape.borderRadius,
    maxWidth: theme.spacing(30),
    marginRight: theme.spacing(1),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    "& .MuiTextField-root": {
      color: "inherit",
    },
    "& .MuiInputBase-input": {
      color: theme.palette.primary.contrastText,
      padding: theme.spacing(1, 0, 1, 1),
      transition: theme.transitions.create("width"),
    },
    "& .MuiInput-underline": {
      borderBottom: "none",
      "&:before": {
        borderBottom: "none",
      },
      "&:after": {
        borderBottom: "none",
      },
      "&:hover:not(.Mui-disabled)::before": {
        borderBottom: "none",
      },
    },
  },
  iconSearch: {
    color: alpha(theme.palette.primary.contrastText, 0.5),
    "&:hover": {
      color: theme.palette.primary.contrastText,
    },
    transition: theme.transitions.create(["color"]),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  buttonCreate: {
    minWidth: 148,
    margin: theme.spacing(0, 2),
  },
  grow: {
    flexGrow: 1,
  },
  chip: {
    letterSpacing: 2,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
}))
