import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  root: {
    height: "100%",
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
  image: {
    backgroundImage: "url(/img/login.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  title: {
    marginBottom: theme.spacing(2),
    fontSize: "2em",
  },
}))
