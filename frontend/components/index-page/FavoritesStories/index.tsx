// Helpers
import { Grid, Typography } from "@material-ui/core"
import { CardStory, Link } from "../../index"
// Hooks
import useStyles from "./styles"
import { useSelector } from "react-redux"

export default function FavoritesStories(): JSX.Element {
  const { favorites } = useSelector(state => state)

  const classes = useStyles()

  if (favorites.length > 0) {
    return (
      <>
        <Grid container justifyContent="center" spacing={2}>
          {favorites.map(story => (
            <Grid item key={`favorite-story-${story._id}`} className={classes.cardContainer}>
              <CardStory story={story} />
            </Grid>
          ))}
        </Grid>
        <Typography
          component={"h3"}
          variant={"h4"}
          align={"center"}
          className={classes.textMarginTop}
        >
          Ya no tienes más historias favoritas.
        </Typography>
        <Typography
          component={"h3"}
          variant={"h5"}
          align={"center"}
          className={classes.textMarginBot}
        >
          <Link href={"/"} underline={"none"}>
            ¡Encuentra más historias!
          </Link>
        </Typography>
      </>
    )
  }
  return <h1>No tienes historias favoritas</h1>
}
