import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
  root: {
    margin: theme.spacing(3, "auto"),
  },
  container: {
    position: "relative",
    top: -35,
    padding: theme.spacing(0, 2),
  },
  secondaryContainer: {
    margin: theme.spacing(2, "auto"),
  },
  endContainer: {
    margin: theme.spacing(3, "auto", 4),
  },
  border: {
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
  image: {
    width: "100%",
    height: 150,
  },
  titleContainer: {
    display: "flex",
    textAlign: "center",
    paddingTop: theme.spacing(4),
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
  avatar: {
    marginRight: 15,
    marginBottom: 10,
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  link: {
    color: "#0984e3",
    cursor: "pointer",
    marginRight: 5,
  },
  indexPart: {
    fontSize: "1.7em",
  },
  continueLink: {
    color: "#FFF",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1),
    fontSize: "1.6em",
    transitionDuration: "0.5s",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  deleteLink: {
    cursor: "pointer",
    color: "#FFF",
    backgroundColor: theme.palette.red.main,
    padding: theme.spacing(1),
    fontSize: "1.6em",
    transitionDuration: "0.5s",
    marginRight: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.red.dark,
    },
  },
  textContent: {
    marginTop: theme.spacing(1),
    maxWidth: "100%",
    fontSize: "1.3em",
    whiteSpace: "pre-line",
    letterSpacing: 1,
    wordBreak: "break-word",
  },
  bottomLinkContainer: {
    margin: theme.spacing(2, "auto"),
  },
  bottomLink: {
    marginRight: theme.spacing(2),
    fontSize: "1.2em",
  },
  cardActionsItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  disabledIcon: {
    color: theme.palette.black.main,
  },
}))
