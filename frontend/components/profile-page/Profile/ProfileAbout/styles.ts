import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  root: {
    minWidth: 366,
  },
  textAbout: {
    fontSize: "1.3em",
    wordBreak: "break-word",
    textAlign: "center",
    fontWeight: "bolder",
  },
  textNoAbout: {
    color: theme.palette.grey[600],
  },
  containerEdit: {
    margin: theme.spacing(3, "auto"),
  },
  containerButtons: {
    marginTop: theme.spacing(1),
  },
  buttonDelete: {
    backgroundColor: theme.palette.red.main,
    color: theme.palette.red.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.red.dark,
    },
  },
  buttonSave: {
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}))
