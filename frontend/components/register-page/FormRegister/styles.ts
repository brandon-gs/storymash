import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  root: {
    height: "100%",
  },
  image: {
    backgroundImage: "url(/img/register.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  avatar: {
    backgroundColor: `${theme.palette.primary.main} !important`,
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
