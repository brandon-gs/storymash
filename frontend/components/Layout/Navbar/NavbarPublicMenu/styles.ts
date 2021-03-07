import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  sectionDesktop: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      justifyContent: "center",
    },
  },
  link: {
    margin: theme.spacing(0, 1),
    fontSize: "1.2em",
    color: theme.palette.grey[200],
    textDecoration: "none",
    transition: "0.6s",
    "&:hover": {
      color: "#FFF",
    },
  },
  linkActive: {
    color: "#FFF",
  },
  menuItemRegister: {
    color: theme.palette.primary.main,
  },
  grow: {
    flexGrow: 1,
  },
  hideLink: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}))
