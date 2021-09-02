import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  avatar: {
    padding: 0,
    marginRight: 15,
    marginBottom: 10,
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  root: {
    margin: theme.spacing(0, "auto", 3, "auto"),
  },
  container: {
    position: "relative",
    top: -35,
    padding: theme.spacing(0, 2),
  },
  secondaryContainer: {
    margin: theme.spacing(2, "auto"),
  },
  image: {
    width: "100%",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      height: 150,
    },
  },
  titleContainer: {
    display: "flex",
    textAlign: "center",
    alignItems: "flex-end",
  },
  title: {
    position: "relative",
    fontSize: theme.spacing(4),
  },
  usernameContainer: {
    position: "absolute",
    left: theme.spacing(11),
    height: theme.spacing(5),
  },
  username: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: "1.5em",
    letterSpacing: 5,
    marginTop: 0,
  },
  link: {
    color: "#0984e3",
    cursor: "pointer",
    marginRight: 5,
  },
}))
