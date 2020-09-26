import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  avatar: {
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 1, 3),
    margin: theme.spacing(5, 1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginBottom: theme.spacing(2),
    fontSize: "2em",
    textAlign: "center",
  },
  buttonLogin: {
    color: "#FFF",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}))
