import React, { useState } from "react"
// Components
import StoryPartsList from "./StoryPartsList"
import StoryPartContent from "./StoryPartContent"
import { Container, Grid, Avatar, Typography } from "@material-ui/core"
import { Link, NotFound } from "components"
// Hooks
import { useReadStory } from "hooks"
import { useSelector } from "react-redux"
import useStyles from "./styles"

export default function ReadStory(): JSX.Element | null {
  const classes = useStyles()
  const { user } = useSelector(state => state.authentication)
  const { docs } = useSelector(state => state.stories)
  const [openDeleteStoryPart, setOpenDeleteStoryPart] = useState(false)
  const [openDeleteStory, setOpenDeleteStory] = useState(false)

  // Add 1 view to current story
  useReadStory(docs.length > 0 ? docs[0]._id : "")

  if (docs.length === 0) {
    return <NotFound />
  }

  const handleOpenDeleteStoryPart = () => setOpenDeleteStoryPart(true)

  const handleCloseDeleteStoryPart = () => setOpenDeleteStoryPart(false)

  const handleOpenDeleteStory = () => setOpenDeleteStory(true)

  const handleCloseDeleteStory = () => setOpenDeleteStory(false)

  const story = docs[0]
  const { author, parts, image } = story
  const background = `linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.9)),url("${image}") no-repeat center center/cover`

  return (
    <>
      <div className={classes.image} style={{ background }} />
      <Container maxWidth="md" className={classes.root}>
        <Grid container direction="column">
          <Grid container justifyContent="space-between" className={classes.container}>
            <Grid item>
              <Link
                href="/profile/[username]"
                as={`/profile/${author.username}`}
                className={classes.username}
              >
                <Avatar
                  alt="Creador de la historia"
                  aria-label="Usuario creador de la historia"
                  color="inherit"
                  src={author.image}
                  className={classes.avatar}
                />
              </Link>
            </Grid>
            <Grid item className={classes.usernameContainer}>
              <Link
                href="/profile/[username]"
                as={`/profile/${author.username}`}
                className={classes.username}
              >
                {author.username}
              </Link>
            </Grid>
            <Grid item className={classes.titleContainer}>
              <Typography component="h1" variant="h1" className={classes.title}>
                {story.title}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" className={classes.container}>
          {/* List all story's parts ex. (#2 #3 #4) */}
          <StoryPartsList parts={parts} />

          {/* Show all story's parts content */}
          {parts.map((part, index) => (
            <StoryPartContent
              key={`story-part-content-${part._id}-${index}`}
              part={part}
              index={index}
              story={story}
              userImage={user?.image || ""}
              authorId={author._id}
              userId={user?._id || ""}
              openDeleteStory={openDeleteStory}
              openDeleteStoryPart={openDeleteStoryPart}
              handleOpenDeleteStory={handleOpenDeleteStory}
              handleOpenDeleteStoryPart={handleOpenDeleteStoryPart}
              handleCloseDeleteStory={handleCloseDeleteStory}
              handleCloseDeleteStoryPart={handleCloseDeleteStoryPart}
            />
          ))}
        </Grid>
      </Container>
    </>
  )
}
