import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    flexDirection: "column",
    padding: theme.spacing(6, 0, 3, 0),
  },
  background: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -10000,
    background:
      'linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url("/img/dashboard.jpg") no-repeat center center/cover',
  },
  message: {
    width: "100%",
    color: "#FFF",
    placeItems: "center",
    padding: "5%",
  },
  title: {
    fontSize: "3.5em",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5em",
    },
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    maxWidth: "450px",
  },
  button: {
    textAlign: "center",
    fontSize: "1.3em",
    width: "40%",
    minWidth: "260px",
    padding: "10px 8px",
    marginBottom: theme.spacing(3),
  },
}))
