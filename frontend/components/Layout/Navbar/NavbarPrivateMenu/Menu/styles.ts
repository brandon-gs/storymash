import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  menu: {
    backgroundColor: theme.palette.primary.dark,
  },
  menuPaper: {
    backgroundColor: theme.palette.primary.dark,
  },
  menuItem: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
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
    minWidth: 268,
  },
  icon: {
    color: theme.palette.common.white,
    minWidth: 32,
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  createStoryItem: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
    },
  },
}))
