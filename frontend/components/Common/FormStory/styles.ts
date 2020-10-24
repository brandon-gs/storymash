import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  title: { fontSize: "2em", margin: theme.spacing(1, 0, 2) },
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
