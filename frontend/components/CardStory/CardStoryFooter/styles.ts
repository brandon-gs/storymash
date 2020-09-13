import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  disabledIcon: {
    color: theme.palette.black.main,
  },
  cardActionsItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}))
