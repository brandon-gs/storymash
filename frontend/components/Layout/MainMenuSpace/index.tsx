import { Box, makeStyles } from "@material-ui/core"
import { useSelector } from "react-redux"

export default function MainMenuSpace() {
  const { auth } = useSelector(state => state.authentication)

  const classes = useStyles()

  if (!auth) return null

  return <Box className={classes.root}></Box>
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "none",
    height: 72,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
}))
