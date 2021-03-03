import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  tabsContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  tabs: {
    width: "100%",
    maxWidth: 500,
  },
  tab: {
    minWidth: 10,
    width: "20%",
    color: theme.palette.grey.A200,
  },
}))
