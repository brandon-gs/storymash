// Components
import Alert, { AlertProps } from "@material-ui/lab/Alert"
import IconButton from "@material-ui/core/IconButton"
import Collapse from "@material-ui/core/Collapse"
import CloseIcon from "@material-ui/icons/Close"
// Hooks
import { useDispatch } from "react-redux"
import { useSelector } from "../../Hooks"
import useStyles from "./styles"
import actions from "../../store/actions"

export default function Message(props: AlertProps): React.ReactElement | null {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { message, open, severity } = useSelector(state => state.app.alert)
  if (message && open && severity) {
    return (
      <div className={classes.root}>
        <Collapse in={open} timeout={700}>
          <Alert
            className={classes.alert}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  dispatch(actions.removeAlert())
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            severity={severity}
            {...props}
          >
            {message}
          </Alert>
        </Collapse>
      </div>
    )
  }
  return null
}
