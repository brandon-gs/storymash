// Components
import { Container, Grid, Typography } from "@material-ui/core"
import CardStory from "../../Common/CardStory"
// Icons
import { SentimentDissatisfied } from "@material-ui/icons"
// Hooks
import { useSelector } from "react-redux"
import useStyles from "./styles"
import { useRouter } from "next/router"

export default function ProfileStories(): JSX.Element {
  const { stories } = useSelector(state => state)

  if (stories.length > 0) {
    return <ShowStories />
  }
  return <NoStories />
}

function NoStories(): JSX.Element {
  const classes = useStyles()
  const router = useRouter()

  const { user } = useSelector(state => state.authentication)
  const { username } = router.query

  const message =
    user?.username === username ? "Aún no tienes historias." : `${username} aún no tiene historias.`

  return (
    <Container maxWidth="md" component="section" className={classes.storiesContainer}>
      <Grid component="article" container alignItems="center" direction="column">
        <Grid container justify="center" alignItems="center">
          <SentimentDissatisfied className={classes.noStoriesIcon} color="primary" />
          <h3>{message}</h3>
        </Grid>
      </Grid>
    </Container>
  )
}

function ShowStories(): JSX.Element {
  const classes = useStyles()
  const {
    stories,
    app: { profile },
  } = useSelector(state => state)
  if (stories.length > 0 && profile) {
    return (
      <Container maxWidth="lg" className={classes.storiesContainer}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Historias de {profile.username}
        </Typography>
        <Grid container justify="center" spacing={2}>
          {stories.map(story => (
            <Grid item key={`story-${story._id}`} className={classes.cardContainer}>
              <CardStory story={story} />
            </Grid>
          ))}
        </Grid>
      </Container>
    )
  }
  return <h1>No tienes historias</h1>
}
