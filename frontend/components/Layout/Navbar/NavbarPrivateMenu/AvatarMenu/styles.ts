import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  avatar: {
    height: theme.spacing(5),
    width: theme.spacing(5),
    cursor: "pointer",
  },
  menu: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
  menuItem: {
    minWidth: 268,
    color: theme.palette.primary.contrastText,
    transition: theme.transitions.create(["background-color"]),
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
    "&:focus": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
  icon: {
    color: theme.palette.primary.contrastText,
  },
  listIcon: {
    minWidth: 40,
  },
  onlyMobile: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
    },
  },
}))
