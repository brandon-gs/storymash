// Helpers
import { Grid } from "@material-ui/core"
import React from "react"
import { CardStory } from "../../index"
// Hooks
import useStyles from "./styles"
import { useSelector } from "react-redux"

export default function FavoritesStories(): JSX.Element {
  const { favorites } = useSelector(state => state)
  const classes = useStyles()

  const uniqueIdStory: Array<string> = []
  const onlyUniqueFavorites: Array<Story> = []
  favorites.slice(0).forEach(story => {
    if (story._id) {
      if (!uniqueIdStory.includes(story._id)) {
        uniqueIdStory.push(story._id)
        onlyUniqueFavorites.push(story)
      }
    }
  })

  if (favorites.length > 0) {
    return (
      <Grid container justify="center" spacing={2}>
        {onlyUniqueFavorites.map(story => (
          <Grid item key={`favorite-story-${story._id}`} className={classes.cardContainer}>
            <CardStory story={story} />
          </Grid>
        ))}
      </Grid>
    )
  }
  return <h1>No tienes historias favoritas</h1>
}
