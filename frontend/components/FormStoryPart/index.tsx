import axios from "axios"
// Components
import { Button, Container, Grid, TextField, Typography } from "@material-ui/core"
import { Link } from "../index"
// Hooks
import { useDispatch } from "react-redux"
import { useState, FormEvent } from "react"
import { useRouter } from "next/router"
import { useSelector } from "../../Hooks"
import useStyles from "./styles"
// Helpers
import actions from "../../store/actions"
import validateStoryForm from "./validate"

export default function CreateStoryPart(): JSX.Element {
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()
  const { token } = useSelector(state => state.authentication)
  const [storyPart, setStoryPart] = useState({
    content: "",
  })
  const maxLength = 1500

  const handleChangeStoryPart = (prop: string) => (event: OnChangeInputType) => {
    setStoryPart({ ...storyPart, [prop]: event.target.value })
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch(actions.removeAlert())
    }, 5000)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    dispatch(actions.updateLoader(true))
    const { content } = storyPart
    const error = validateStoryForm({ content })
    if (error !== null) {
      dispatch(actions.updateAlert({ message: error, severity: "error" }))
      clearAlert()
    } else {
      try {
        const idStory = router.query.id
        const { data } = await axios.post(`/api/story/part/${idStory}`, storyPart, {
          headers: { authorization: token },
        })
        dispatch(actions.updateUser(data.user))
        dispatch(actions.removeAlert())
        await router.push("/")
      } catch (e) {
        dispatch(
          actions.updateAlert({
            message: "Lo sentimos, ocurrió un error inténtalo más tarde",
            severity: "error",
          })
        )
        clearAlert()
      }
    }
    dispatch(actions.updateLoader(false))
  }

  return (
    <>
      <Container maxWidth="md" className={classes.root}>
        <Typography variant="h1" className={classes.title}>
          Continuar historia
        </Typography>
        <Container maxWidth="md" className={classes.root}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  placeholder="Escribe la nueva parte de tu historia..."
                  name="content"
                  value={storyPart.content}
                  onChange={handleChangeStoryPart("content")}
                  variant="outlined"
                  rows={15}
                  rowsMax={15}
                  required
                  fullWidth
                  multiline
                />
              </Grid>
            </Grid>
            <Grid container justify="space-between" spacing={3}>
              <Grid item>
                <Link href="/" className={classes.link}>
                  Volver
                </Link>
              </Grid>
              <Grid item>
                <p className={classes.infoCategory}>
                  {maxLength - storyPart.content.length} caracteres restantes
                </p>
              </Grid>
            </Grid>
            <Grid container justify="flex-end" spacing={3}>
              <Grid item>
                <Button variant="contained" color="primary" type="submit">
                  Publicar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Container>
    </>
  )
}
