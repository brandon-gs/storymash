// Components
import Alert, { AlertProps } from "@material-ui/lab/Alert"
import { IconButton, Slide } from "@material-ui/core"
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

  return (
    <div className={classes.root}>
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
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
          variant="filled"
          {...props}
        >
          {message}
        </Alert>
      </Slide>
    </div>
  )
}