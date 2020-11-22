import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  imageLogo: {
    width: "100%",
    height: "100%",
  },
  logo: {
    height: theme.spacing(6),
    width: theme.spacing(6),
    backgroundColor: "unset",
    marginRight: theme.spacing(2),
  },
  containerLogo: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
}))
