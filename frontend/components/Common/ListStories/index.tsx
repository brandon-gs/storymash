// Components
import { Grid, Grow } from "@material-ui/core"
import { CardStory } from "../../index"
// Hooks
import useStyles from "./styles"

interface ListStoriesProps {
  stories: Array<Story>
  redirect?: boolean
  timeout?: number
  // styles?:
}

export default function ShowStories({ stories, timeout, redirect = true }: ListStoriesProps) {
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
            <CardStory story={story} redirect={redirect} />
          </Grid>
        </Grow>
      ))}
    </Grid>
  )
}
