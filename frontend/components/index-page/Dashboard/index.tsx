import { useEffect, useState } from "react"
import axios from "axios"
// Components
import { Grid, Typography, Container, Button } from "@material-ui/core"
import { Link, ListStories } from "components"
// Styles
import useStyles from "./styles"
// Helpers
import defaultStory from "./defaultStory"
import { getRandomNumber } from "utils/helpers"

export default function Dashboard(): JSX.Element {
  const classes = useStyles()
  const [storyLoaded, setStoryLoaded] = useState(false)
  const [story, setStory] = useState(defaultStory)

  // GET RANDOM STORY
  useEffect(() => {
    ;(async () => {
      try {
        const {
          data: { docs },
        }: RandomStoryResponse = await axios.get("/api/story/random/?limit=10&page=0&offset=0")
        if (docs.length > 0) {
          const idxRandomStory = getRandomNumber(0, docs.length)
          const randomStory = docs[idxRandomStory]
          setStory(randomStory)
          setStoryLoaded(true)
        } else {
          setStory(defaultStory)
          setStoryLoaded(true)
        }
      } catch (error) {
        setStory(defaultStory)
        setStoryLoaded(true)
      }
    })()
  }, [])

  return (
    <Container maxWidth="lg" className={classes.root}>
      <div className={classes.background} />
      <Grid container className={classes.message} spacing={3}>
        <Grid item md className={classes.welcome}>
          <Typography component="h1" variant="h1" className={classes.title}>
            La comunidad favorita de lectores y escritores.
          </Typography>
          <Typography component="h1" variant="h1" className={classes.title}>
            Un lugar mágico donde las historias son las protagonistas.
          </Typography>
          <Grid container justify="center" alignItems="center">
            <Button
              color="primary"
              variant="contained"
              component={Link}
              href="/register"
              className={classes.button}
              naked
            >
              Unirse a storymash
            </Button>
          </Grid>
        </Grid>
        {storyLoaded && (
          <Grid item md className={classes.storyContainer}>
            <ListStories
              redirect={false}
              stories={[story]}
              timeout={1500}
              styles={{ container: classes.storyContainer }}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  )
}
