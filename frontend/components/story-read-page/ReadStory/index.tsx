import clsx from "clsx"
import customScroll from "utils/scroll"
// Components
import { Container, Grid, Avatar, Typography } from "@material-ui/core"
import { QuestionAnswer } from "@material-ui/icons"
import TimeAgo from "timeago-react"
import { DeleteStoryModal, Link, ButtonLike, NotFound } from "components"
// Hooks
import { useReadStory } from "hooks"
import { useSelector } from "react-redux"
import useStyles from "./styles"
import { useState } from "react"
// Timeago config
import * as timeago from "timeago.js"
import es from "timeago.js/lib/lang/es"

// Register spanish
timeago.register("es", es)

export default function ReadStory(): JSX.Element | null {
  const classes = useStyles()
  const { user } = useSelector(state => state.authentication)
  const { docs } = useSelector(state => state.stories)
  const [openStoryPart, setOpenStoryPart] = useState(false)
  const [openStory, setOpenStory] = useState(false)

  if (docs.length === 0) {
    return <NotFound />
  }

  // Add 1 view to current story
  useReadStory(docs[0]._id)

  const handleOpenStoryPart = () => {
    setOpenStoryPart(true)
  }

  const handleCloseStoryPart = () => {
    setOpenStoryPart(false)
  }

  const handleOpenStory = () => {
    setOpenStory(true)
  }

  const handleCloseStory = () => {
    setOpenStory(false)
  }

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
          {parts.length > 1 && (
            <Grid item>
              <Typography component="p" variant="body2">
                <span style={{ fontWeight: "bold" }}>Partes </span>
                {parts.map(
                  (part, index) =>
                    index + 1 > 1 && (
                      <a
                        key={`link-${index}`}
                        onClick={() => customScroll(`part-${index}`)}
                        className={classes.link}
                      >
                        #{index + 1}
                      </a>
                    )
                )}
              </Typography>
            </Grid>
          )}
          {parts.map((part, index) => {
            return (
              <Container key={`part-${index}`}>
                <DeleteStoryModal
                  open={openStory}
                  handleClose={handleCloseStory}
                  idStory={story._id}
                />
                <DeleteStoryModal
                  open={openStoryPart}
                  handleClose={handleCloseStoryPart}
                  idPart={part._id}
                />
                <Grid
                  container
                  justifyContent="space-between"
                  className={classes.endContainer}
                  key={`part-${index}`}
                  id={`part-${index}`}
                >
                  <Grid item>
                    <Typography
                      className={classes.indexPart}
                      component="p"
                      variant="body2"
                      color="primary"
                    >{`#${index + 1}`}</Typography>
                  </Grid>
                  {index === 0 && user?._id === author._id && (
                    <>
                      <Grid item>
                        <a onClick={handleOpenStory} className={classes.deleteLink}>
                          Eliminar
                        </a>
                        <Link
                          href="/story/part/add/[id]"
                          as={`/story/part/add/${story._id}`}
                          className={classes.continueLink}
                          underline="none"
                        >
                          Continuar
                        </Link>
                      </Grid>
                    </>
                  )}
                </Grid>
                <Grid container>
                  <Grid item>
                    <Typography component="pre" variant="body2" className={classes.textContent}>
                      {part.content}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container className={classes.bottomLinkContainer}>
                  {user?._id === author?._id && (
                    <>
                      <Grid item className={classes.bottomLink}>
                        <Link
                          href="/story/part/[id]/[part]"
                          as={`/story/part/${story._id}/${index}`}
                          underline="none"
                        >
                          Editar
                        </Link>
                      </Grid>
                      {index > 0 && (
                        <Grid item className={classes.bottomLink}>
                          <a
                            onClick={handleOpenStoryPart}
                            className={clsx(classes.link, classes.deletePartLink)}
                          >
                            Eliminar
                          </a>
                        </Grid>
                      )}
                    </>
                  )}
                </Grid>
                <Grid container justifyContent="space-between" className={classes.border}>
                  <Grid item>
                    <TimeAgo locale="es" datetime={story.parts[index].createdAt} />
                  </Grid>
                  <Grid item>
                    <Grid container spacing={1} direction="row-reverse">
                      <Grid item className={classes.cardActionsItem}>
                        <ButtonLike story={story} part={part} />
                        <Typography variant="body2" component="p">
                          {part.likes.length}
                        </Typography>
                      </Grid>
                      <Grid item className={classes.cardActionsItem}>
                        <QuestionAnswer className={classes.disabledIcon} />
                        <Typography variant="body2" component="p">
                          {part.comments.length}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
            )
          })}
        </Grid>
      </Container>
    </>
  )
}
