// Components
import { Grid, Grow } from "@material-ui/core"
import { CardStory } from "../../index"
// Hooks
import useStyles from "./styles"

type Props = {
  stories: Array<Story>
}

export default function ShowStories({ stories }: Props) {
  const classes = useStyles()
  return (
    <Grid container justifyContent="center" spacing={2}>
      {stories.map((story, index) => (
        <Grow
          in={true}
          key={`story-${story._id}-${index}`}
          {...{ timeout: 500 * index < 2000 ? 400 * index : 2000 }}
        >
          <Grid item className={classes.cardContainer}>
            <CardStory story={story} />
          </Grid>
        </Grow>
      ))}
    </Grid>
  )
}
