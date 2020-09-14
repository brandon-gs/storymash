import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  title: {
    fontSize: "2em",
  },
  form: {
    width: "100%",
  },
  link: {
    display: "block",
  },
  infoCategory: {
    color: "#747d8c",
    margin: 0,
  },
}))
