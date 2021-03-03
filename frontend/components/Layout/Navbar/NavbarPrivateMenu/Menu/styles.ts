import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}))
