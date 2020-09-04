import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: "#0984e3 !important",
  },
  alert: {
    marginBottom: theme.spacing(2),
  },
  image: {
    backgroundImage: "url(/img/login.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(5, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginBottom: theme.spacing(2),
    fontSize: "2em",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))
