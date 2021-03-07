import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  title: {
    fontSize: 24,
  },
  input: {
    minWidth: 268,
    maxWidth: 268,
    width: "100%",
    margin: theme.spacing(1, 0, 0),
  },
  characters: {
    display: "flex",
    justifyContent: "flex-end",
    color: "#747d8c",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 298,
    width: "100%",
    padding: theme.spacing(1, 0),
    marginBottom: theme.spacing(1),
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  form: { width: "100%" },
  infoCategory: { color: "#747d8c", margin: 0 },
  categorySelected: {
    backgroundColor: theme.palette.primary.main,
    color: "#FFF",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  categoryNotSelected: {
    backgroundColor: theme.palette.grey[400],
    "&:hover": {
      backgroundColor: theme.palette.grey[500],
    },
  },
  link: { display: "block", margin: theme.spacing(2, 0) },
  nameImage: { fontWeight: "bold" },
}))
