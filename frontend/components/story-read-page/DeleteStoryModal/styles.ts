import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

export default makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    title: {
      textAlign: "center",
    },
    buttonDelete: {
      color: "#FFF",
      backgroundColor: theme.palette.red.main,
      "&:hover": {
        backgroundColor: theme.palette.red.dark,
      },
    },
    buttonCancel: {
      color: "#FFF",
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  })
)
