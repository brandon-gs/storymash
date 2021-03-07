import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    flexDirection: "column",
    paddingBottom: theme.spacing(2),
    width: "100%",
    height: "calc(100% - 70px)",
  },
  background: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -10000,
    background:
      'linear-gradient(to right, rgba(0,0,0,0.9),rgba(0,0,0,0.6)),url("/img/dashboard.jpg") no-repeat center center/cover',
  },
  welcome: {
    minWidth: "600px",
    padding: "80px 40px",
    [theme.breakpoints.down("md")]: {
      padding: "10px 40px",
      maxWidth: "720px",
    },
    [theme.breakpoints.only("sm")]: {
      maxWidth: "600px",
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "300px",
    },
  },
  message: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    color: "#FFF",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },
  title: {
    fontSize: "3.5em",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5em",
    },
  },
  storyContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    margin: "16px 0",
    [theme.breakpoints.down("md")]: {
      margin: 0,
      marginRight: 8,
      height: "auto",
      alignItems: "flex-start",
    },
  },
  button: {
    textAlign: "center",
    fontSize: "1.3em",
    width: "40%",
    minWidth: 260,
    padding: "10px 8px",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.only("md")]: {
      minWidth: 350,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
}))
