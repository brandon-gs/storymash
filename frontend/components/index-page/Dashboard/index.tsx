import useStyles from "./styles"
import { Grid, Typography, Container, Button } from "@material-ui/core"
import { Link, ListStories } from "../../index"
import useRandomStory from "hooks/useRandomStory"
import React from "react"

export default function Dashboard(): JSX.Element {
  const classes = useStyles()

  const { story, storyLoaded, isDefaultStory } = useRandomStory()

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
          <Grid container justifyContent="center" alignItems="center">
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
            <ListStories redirect={!isDefaultStory} stories={[story]} timeout={1500} />
          </Grid>
        )}
      </Grid>
    </Container>
  )
}
