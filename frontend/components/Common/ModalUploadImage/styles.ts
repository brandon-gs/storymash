import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    // border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 0, 3),
    width: "100%",
    maxWidth: 500,
  },
  title: {
    textAlign: "center",
  },
  buttonUpload: {
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  buttonCancel: {
    color: "#FFF",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  image: {
    width: "100%",
    height: 190,
    maxHeight: 190,
  },
}))
