import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  root: {
    display: "flex",
    flexFlow: "column",
    flexGrow: 1,
    width: 300,
    maxWidth: 300,
  },
  cardContainer: {
    marginBottom: theme.spacing(2),
  },
}))
