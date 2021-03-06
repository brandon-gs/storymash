import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  cardContainer: {
    width: 300,
    minWidth: 300,
    maxWidth: 320,
  },
  textMarginTop: {
    marginTop: theme.spacing(9),
  },
  textMarginBot: {
    marginBottom: theme.spacing(10),
  },
}))
