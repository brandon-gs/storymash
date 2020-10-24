import Backdrop from "@material-ui/core/Backdrop"
import CircularProgress from "@material-ui/core/CircularProgress"
// Hooks
import useStyles from "./styles"
import { useSelector } from "react-redux"

export default function SimpleBackdrop(): JSX.Element {
  const classes = useStyles()
  const { loader } = useSelector(state => state.app)
  return (
    <div>
      <Backdrop className={classes.backdrop} open={loader.active}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}
