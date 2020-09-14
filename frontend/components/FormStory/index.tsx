// Components
import { Container, Typography, Grid, TextField, Button } from "@material-ui/core"
import { Link, ModalUploadImage } from ".."
// Hooks
import useStyles from "./styles"
import { useState, ChangeEvent, FormEvent } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "../../Hooks"
import { useRouter } from "next/router"
// helpers
import { maxLength, categories } from "./helpers"
import validateStoryForm from "./validate"
import actions from "../../store/actions"
import { createStory, editStoryPart, editStory } from "./request"

type Props = {
  mode: "edit" | "create"
  propStory?: Story
  propStoryPart?: StoryPart
}

type StoryState = {
  title: string
  category: Array<string>
}

type StoryPartState = {
  content: string
}

type OnChangeInputType = ChangeEvent<HTMLTextAreaElement | HTMLInputElement>

export default function FormStory({ mode, propStory, propStoryPart }: Props): JSX.Element {
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()
  const { token } = useSelector(state => state.authentication)

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [story, setStory] = useState<StoryState>({
    title: propStory && propStory.title ? propStory.title : "",
    category: propStory ? propStory.category : [],
  })
  const [storyPart, setStoryPart] = useState<StoryPartState>({
    content: propStoryPart ? propStoryPart.content : "",
  })

  const handleChangeStory = (prop: string) => (event: OnChangeInputType) => {
    const { value } = event.target
    setStory({ ...story, [prop]: value })
  }

  const handleCategory = (currentCategory: string) => {
    const { category } = story
    if (!category.includes(currentCategory) && category.length < 2) {
      category.push(currentCategory)
    } else if (category.includes(currentCategory)) {
      const indexOfCurrentCategory = category.indexOf(currentCategory)
      category.splice(indexOfCurrentCategory, 1)
    }
    setStory({ ...story, category })
  }

  const handleChangeStoryPart = (prop: string) => (event: OnChangeInputType) => {
    const { value } = event.target
    setStoryPart({ ...storyPart, [prop]: value })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    dispatch(actions.updateLoader(true))
    const { title, category } = story
    const { content } = storyPart
    const error = validateStoryForm({ title, category, content })
    if (error !== null) {
      dispatch(actions.updateAlert({ message: error, severity: "error" }))
    } else if (token) {
      // Replace all space at final of string
      const transformCategory = category.map(category => category.replace(/\s+$/, ""))
      try {
        if (mode === "create") {
          const body = { story: { title, category: transformCategory }, part: { content } }
          const story = await createStory(body, token)
          if (story) {
            dispatch(actions.updateStories([story]))
          }
        } else if (propStoryPart?._id && propStory?._id) {
          const body = { title, category: transformCategory }
          await editStoryPart(propStoryPart._id, { content: storyPart.content }, token)
          await editStory(propStory._id, body, token)
        }
        setOpenModal(true)
      } catch (e) {
        dispatch(
          actions.updateAlert({
            message: "Lo sentimos, ocurrió un error inténtalo más tarde",
            severity: "error",
          })
        )
      }
    }
    dispatch(actions.updateLoader(false))
  }

  const handleCloseModal = async () => {
    await router.push("/")
    dispatch(
      actions.updateAlert({
        message: "¡Su historia ha sido creada!",
        severity: "success",
      })
    )
  }

  return (
    <Container maxWidth="md" className={classes.root}>
      <ModalUploadImage open={openModal} handleClose={handleCloseModal} />
      <Typography variant="h1" className={classes.title}>
        {mode === "edit" ? "Editar Historia" : "Crear historia"}
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Título"
              name="title"
              value={story.title}
              onChange={handleChangeStory("title")}
              variant="outlined"
              fullWidth
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Escribe el comienzo de tu historia aquí..."
              name="content"
              value={storyPart.content}
              onChange={handleChangeStoryPart("content")}
              variant="outlined"
              rows={15}
              rowsMax={15}
              fullWidth
              multiline
            />
          </Grid>
        </Grid>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <p className={classes.infoCategory}>* Se deben seleccionar sólo 2 categorias: </p>
          </Grid>
          <Grid item>
            <p className={classes.infoCategory}>
              {maxLength - storyPart.content.length} caracteres restantes
            </p>
          </Grid>
          <Grid container spacing={2}>
            {categories.map((category, index) => (
              <Grid item key={`category-${category}-${index}`}>
                <Button
                  variant="contained"
                  className={
                    story.category.includes(category)
                      ? classes.categorySelected
                      : classes.categoryNotSelected
                  }
                  onClick={() => handleCategory(category)}
                >
                  {category}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Link href="/" className={classes.link}>
              Volver
            </Link>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              {mode === "edit" ? "Publicar cambios" : "Publicar historia"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}
