// Components
import {
  Card,
  Grid,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Avatar,
  Chip,
} from "@material-ui/core"
import { Link } from "../index"
import CardStoryFooter from "./CardStoryFooter"
// Hooks
import useStyles from "./styles"
import { useState, useEffect } from "react"
import { useSelector } from "../../Hooks"

function getContent(content: string) {
  const minLength = 250
  const maxLength = 300
  const length = Math.floor(Math.random() * (maxLength - minLength) + minLength)
  if (content.length > length) {
    const currentContent = content.substr(0, length)
    return currentContent
  }
  return content
}

type Props = {
  story: Story
}

export default function CardStory({ story }: Props): JSX.Element {
  const { profile } = useSelector(state => state.app)
  const background = `linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.9)),url("${story.image}") no-repeat center center/cover`
  const classes = useStyles()
  const [content, setContent] = useState(story.parts[0].content)
  useEffect(() => {
    setContent(getContent(content))
  }, [])

  return (
    <Card className={classes.root}>
      <CardActionArea
        className={classes.cardActionArea}
        component={Link}
        href={"/story/read/[id]"}
        as={`/story/read/${story._id}`}
        underline="none"
      >
        <img className={classes.image} style={{ background }} />
        <Grid container className={classes.userContainer}>
          <Grid item>
            <Avatar
              alt="Creador de la historia"
              aria-label="Usuario creador de la historia"
              color="inherit"
              src={profile ? profile.image : story.author.image}
              className={classes.avatar}
            />
          </Grid>
          <Grid item className={classes.usernameContainer}>
            <span className={classes.username}>{story.author.username}</span>
          </Grid>
        </Grid>
        <CardContent className={classes.userContainer}>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            {story.title}
          </Typography>
          <Typography gutterBottom variant="body2" component="p" className={classes.textContent}>
            {content}
          </Typography>
          {story.category.map(category => (
            <Chip
              key={`${story._id}-chip-${category}`}
              label={`# ${category}`}
              color="primary"
              size="small"
              className={classes.chipCategory}
            />
          ))}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <CardStoryFooter story={story} />
      </CardActions>
    </Card>
  )
}
