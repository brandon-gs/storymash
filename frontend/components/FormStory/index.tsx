// Components
import { Container, Typography, Grid, TextField, Button } from "@material-ui/core"
// Hooks
import useStyles from "./styles"
import { Link } from ".."
import { useState, ChangeEvent, FormEvent } from "react"
import { useDispatch } from "react-redux"
import actions from "../../store/actions"
import validateStoryForm from "./validate"
import { createStory, editStoryPart, editStory } from "./request"
import { useSelector } from "../../Hooks"
import { useRouter } from "next/router"
import { maxLength, categories } from "./helpers"

type Props = {
  mode: "edit" | "create"
  propStory?: Story
  propStoryPart?: StoryPart
}

type OnChangeInputType = ChangeEvent<HTMLTextAreaElement | HTMLInputElement>

export default function FormStory({ mode, propStory, propStoryPart }: Props): JSX.Element {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.authentication)
  const [story, setStory] = useState<Story>({
    title: propStory ? propStory.title : "",
    category: propStory ? propStory.category : [],
  })
  const [storyPart, setStoryPart] = useState<StoryPart>({
    content: propStoryPart ? propStoryPart.content : "",
  })
  const router = useRouter()

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
          createStory(body, token)
        } else {
          const storyPartBody: StoryPart = {
            content: storyPart.content,
          }
          if (propStoryPart?._id && propStory?._id) {
            const body: Story = { title, category: transformCategory }
            await editStoryPart(propStoryPart._id, storyPartBody, token)
            await editStory(propStory._id, body, token)
          }
        }
        dispatch(
          actions.updateAlert({
            message: "¡Su historia ha sido creada!",
            severity: "success",
          })
        )
        await router.push("/")
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

  return (
    <Container maxWidth="md" className={classes.root}>
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
            <Button variant="contained" color="secondary" type="submit">
              {mode === "edit" ? "Publicar cambios" : "Publicar historia"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}
