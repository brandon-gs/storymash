import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  root: {
    minWidth: 284,
    maxWidth: 300,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  textContent: {
    wordBreak: "break-word",
    color: theme.palette.black.main,
    fontSize: "1.2em",
  },
  colorBlack: {
    color: "#2d3436",
  },
  title: {
    fontSize: "1.4em",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 125,
  },
  media: {
    height: 100,
  },
  userContainer: {
    position: "relative",
    top: -30,
    padding: theme.spacing(0, 2),
  },
  usernameContainer: {
    height: theme.spacing(5),
  },
  username: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: "1.1em",
    letterSpacing: 2,
    marginTop: 0,
  },
  avatar: {
    marginRight: 4,
    marginBottom: 10,
  },
  cardActions: {
    display: "flex",
    justifyContent: "end",
  },
  cardActionArea: {
    borderBottom: "1px solid #dfe6e9",
  },
  cardActionsItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  chipCategory: {
    margin: theme.spacing(1, 1, 0, 0),
    fontWeight: "bold",
  },
}))
