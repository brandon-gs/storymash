import axios from "axios"
// Components
import { Modal, Backdrop, Button, Fade, Grid } from "@material-ui/core"
import Files from "react-butterfiles"
import { PhotoCamera } from "@material-ui/icons"
// Hooks
import useStyles from "./styles"
import { useSelector, useDispatch } from "react-redux"
// Helpers
import { getUploadErrorMessage } from "../../../utils"
import actions from "../../../store/actions"
import { useState } from "react"

type Props = {
  open: boolean
  handleClose: () => void
  handleSubmit: () => void
  story: Story | null | undefined
}

const getBackground = (image: string) => {
  return `linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0)),url("${image}") no-repeat center center/cover`
}

export default function ModalUploadImage({
  open,
  handleClose,
  handleSubmit,
  story,
}: Props): JSX.Element {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.authentication)

  const routeImage = story ? story?.image : "/img/dashboard.jpg"
  const background = getBackground(routeImage)
  // state
  const [image, setImage] = useState(background)

  console.log(story)

  const handleUploadImage = async (images: Array<any>) => {
    dispatch(actions.updateLoader(true))
    try {
      const image = images[0]
      const { file } = image.src
      file.id = image.id
      const formData = new FormData()
      formData.append("image", file)
      const result = await axios.post(`/api/story/image/${story?._id}`, formData, {
        headers: {
          authorization: token,
        },
      })
      if (result) {
        const background = getBackground(result.data.story.image)
        setImage(background)
      }
    } catch (error) {
      dispatch(
        actions.updateAlert({
          severity: "error",
          message: "Ocurrio un error al subir la imágen intentalo de nuevo",
        })
      )
    }

    dispatch(actions.updateLoader(false))
  }

  const handleErrorUploadImage = (errors: Array<any>) => {
    const error = errors[0]
    const message = getUploadErrorMessage(error.type)
    dispatch(actions.updateAlert({ message, severity: "error", open: true }))
    setTimeout(() => {
      dispatch(actions.removeAlert())
    }, 5000)
  }

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
          <div className={classes.image} style={{ background: image }} />
          <h2 id="transition-modal-title" className={classes.title}>
            Portada de la historia
          </h2>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Files
                multiple={false}
                maxSize="2mb"
                accept={["image/jpg", "image/jpeg", "image/png"]}
                onSuccess={handleUploadImage}
                onError={handleErrorUploadImage}
              >
                {({ browseFiles }: FilesProps) => (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={browseFiles}
                    className={classes.buttonUpload}
                    endIcon={<PhotoCamera />}
                  >
                    Subir otra portada
                  </Button>
                )}
              </Files>
            </Grid>
            <Grid item>
              <Button variant="contained" className={classes.buttonCancel} onClick={handleSubmit}>
                Publicar historia
              </Button>
            </Grid>
          </Grid>
        </div>
      </Fade>
    </Modal>
  )
}
