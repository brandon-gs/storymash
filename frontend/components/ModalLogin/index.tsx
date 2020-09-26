// Components
import { Modal, Fade, Backdrop, Typography, Avatar } from "@material-ui/core"
import { LockOutlined } from "@material-ui/icons"
// Hooks
import useStyles from "./styles"
import { FormLogin } from ".."

type Props = {
  handleClose: () => void
  open: boolean
  idPart?: string
  idStory?: string
}

export default function ModalLogin({ open, handleClose }: Props): JSX.Element {
  const classes = useStyles()
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h2" variant="h2" className={classes.title}>
            Iniciar sesión
          </Typography>
          <FormLogin />
        </div>
      </Fade>
    </Modal>
  )
}
