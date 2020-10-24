import axios from "axios"
import actions from "../../../store/actions"
// Components
import { Modal, Backdrop, Button, Fade, Grid } from "@material-ui/core"
// Hooks
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router"
import useStyles from "./styles"

type Props = {
  handleClose: () => void
  open: boolean
  idPart?: string
  idStory?: string
}

export default function DeleteStoryModal({
  idStory,
  idPart,
  open,
  handleClose,
}: Props): JSX.Element {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { token } = useSelector(state => state.authentication)
  const router = useRouter()

  const title = idStory
    ? "¿Deseas eliminar la historia?"
    : "¿Deseas eliminar esta parte de la historia?"

  const handleDeleteStory = async () => {
    dispatch(actions.updateLoader(true))
    await axios.delete(`/api/story/${idStory}`, {
      headers: {
        authorization: token,
      },
    })
    await router.push("/")
    dispatch(actions.updateLoader(false))
  }

  const handleDeleteStoryPart = async () => {
    dispatch(actions.updateLoader(true))
    const { data } = await axios.delete(`/api/story/part/${idPart}`, {
      headers: {
        authorization: token,
      },
    })
    const stories = [data.story]
    dispatch(actions.updateStories(stories))
    dispatch(actions.updateLoader(false))
    handleClose()
  }

  const handleDelete = idStory ? handleDeleteStory : handleDeleteStoryPart

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
          <h2 id="transition-modal-title" className={classes.title}>
            {title}
          </h2>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Button variant="contained" className={classes.buttonCancel} onClick={handleClose}>
                Cancelar
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" className={classes.buttonDelete} onClick={handleDelete}>
                Eliminar
              </Button>
            </Grid>
          </Grid>
        </div>
      </Fade>
    </Modal>
  )
}
