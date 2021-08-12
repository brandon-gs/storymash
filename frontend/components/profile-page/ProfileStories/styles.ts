import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  storiesContainer: {
    justifyContent: "center",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
    minWidth: 366,
  },
  noStoriesIcon: {
    fontSize: 60,
    marginRight: theme.spacing(2),
  },
  cardContainer: {
    width: 300,
    minWidth: 300,
    maxWidth: 320,
  },
  createStory: {
    display: "flex",
    background: theme.palette.success.main,
    color: "#FFF",
    fontSize: 20,
    padding: theme.spacing(2, 1),
    borderRadius: 5,
    margin: theme.spacing(2, 0),
    "&:hover": {
      background: theme.palette.success.dark,
    },
  },
  textMarginTop: {
    marginTop: theme.spacing(10),
  },
  textMarginBot: {
    marginBottom: theme.spacing(10),
  },
}))
