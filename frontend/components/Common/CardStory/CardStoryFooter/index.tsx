// Components
import { Grid, Typography } from "@material-ui/core"
import { ButtonLike } from "../../../index"
// Icons
import { Visibility, QuestionAnswer } from "@material-ui/icons"
// hooks
import useStyles from "./styles"

// Return the number of likes or comments that have all parts
function getCountProperty(parts: Array<StoryPart>, property: "likes" | "comments") {
  return parts.reduce((propertyCount, part) => {
    return propertyCount + part[property].length
  }, 0)
}

type Props = {
  story: Story
}

export default function CardStoryFooter({ story }: Props): JSX.Element {
  const classes = useStyles()
  const likes = getCountProperty(story.parts, "likes")
  const comments = getCountProperty(story.parts, "comments")
  return (
    <Grid container spacing={1} direction="row-reverse">
      <Grid item className={classes.cardActionsItem}>
        <ButtonLike part={story.parts[0]} story={story} storyPartIndex={0} />
        <Typography variant="body2" component="p">
          {likes}
        </Typography>
      </Grid>
      <Grid item className={classes.cardActionsItem}>
        <QuestionAnswer className={classes.disabledIcon} />
        <Typography variant="body2" component="p">
          {comments}
        </Typography>
      </Grid>
      <Grid item className={classes.cardActionsItem}>
        <Visibility className={classes.disabledIcon} />
        <Typography variant="body2" component="p">
          {story.views.length}
        </Typography>
      </Grid>
    </Grid>
  )
}
