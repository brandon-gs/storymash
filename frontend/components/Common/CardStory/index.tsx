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
import { Link } from "../../index"
import CardStoryFooter from "./CardStoryFooter"
// Hooks
import useStyles from "./styles"
import { useState, useEffect } from "react"

function getContent(content: string) {
  const minLength = 250
  const maxLength = 300
  const length = Math.floor(Math.random() * (maxLength - minLength) + minLength)
  if (content.length > length) {
    const currentContent = content.substr(0, length)
    return currentContent + "..."
  }
  return content
}

interface CardStoryProps {
  story: Story
  redirect?: boolean
}

export default function CardStory({ story, redirect = true }: CardStoryProps): JSX.Element {
  const background = `linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.9)),url("${story.image}") no-repeat center center/cover`
  const classes = useStyles()
  const [content, setContent] = useState(story.parts[0].content)
  useEffect(() => {
    setContent(getContent(content))
  }, [content])

  const authorImage = story.author.image

  const cardRedirectProps = getCardProps(redirect, story)

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.cardActionArea} {...cardRedirectProps}>
        <div className={classes.image} style={{ background }} />
        <Grid container className={classes.userContainer}>
          <Grid item>
            <Avatar
              alt="Creador de la historia"
              aria-label="Usuario creador de la historia"
              color="inherit"
              src={authorImage}
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

export const getCardProps = (redirect: boolean, story: Story) => {
  const urlStory = {
    href: "/story/read/[id]",
    as: `/story/read/${story._id}`,
  }
  const noRedirect = {
    href: "#",
    as: "",
  }
  const url = redirect ? urlStory : noRedirect
  return url.href !== "#"
    ? {
        component: Link,
        href: url.href,
        as: url.as,
        underline: "none",
      }
    : {}
}
