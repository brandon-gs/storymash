import { makeStyles } from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"

export default function CircleLoader(): JSX.Element {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress size={64} color="primary" />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    display: "grid",
    placeItems: "center",
    width: "100%",
    height: "calc(100vh - 64px)",
  },
}))
