import clsx from "clsx"
import { makeStyles, Typography } from "@material-ui/core"
import { Container, Grid } from "@material-ui/core"
import { QuestionAnswer } from "@material-ui/icons"
import { ButtonLike, DeleteStoryModal, Link } from "components"
import TimeAgo from "timeago-react"
import StoryPartActions from "../StoryPartActions"
// Timeago config
import * as timeago from "timeago.js"
import es from "timeago.js/lib/lang/es"
import StoryPartCreateComment from "../StoryPartCreateComment"
import StoryPartListComments from "../StoryPartListComments"

// Register timeago spanish
timeago.register("es", es)

interface StoryPartContentProps {
  userId: string
  authorId: string
  userImage: string
  story: Story
  part: StoryPart
  index: number
  openDeleteStory: boolean
  openDeleteStoryPart: boolean
  handleOpenDeleteStory: () => void
  handleCloseDeleteStory: () => void
  handleOpenDeleteStoryPart: () => void
  handleCloseDeleteStoryPart: () => void
}

export default function StoryPartContent({
  part,
  index,
  story,
  userId,
  userImage,
  authorId,
  openDeleteStory,
  handleCloseDeleteStory,
  openDeleteStoryPart,
  handleCloseDeleteStoryPart,
  handleOpenDeleteStory,
  handleOpenDeleteStoryPart,
}: StoryPartContentProps) {
  const classes = useStyles()

  const isAuthor = userId === authorId

  return (
    <Container style={{ padding: 0 }} key={`part-${index}`}>
      <DeleteStoryModal
        open={openDeleteStory}
        handleClose={handleCloseDeleteStory}
        idStory={story._id}
      />
      <DeleteStoryModal
        open={openDeleteStoryPart}
        handleClose={handleCloseDeleteStoryPart}
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
        {index === 0 && isAuthor && (
          <>
            <Grid item>
              <a onClick={handleOpenDeleteStory} className={classes.deleteLink}>
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
        <StoryPartActions
          isAuthor={isAuthor}
          index={index}
          handleDelete={handleOpenDeleteStoryPart}
          story={story}
        />
      </Grid>

      <Grid container justifyContent="space-between" className={clsx(!userId && classes.space)}>
        <Grid item>
          <TimeAgo
            locale="es"
            datetime={story.parts[index].createdAt}
            className={classes.createdAt}
          />
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

      <StoryPartListComments
        comments={part.comments}
        indexPart={index}
        userId={userId}
        userImage={userImage}
        storyPartId={part._id}
      />
    </Container>
  )
}

const useStyles = makeStyles(theme => ({
  space: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(8),
  },
  createdAt: {
    color: theme.palette.grey[600],
  },
  cardActionsItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  disabledIcon: {
    color: theme.palette.black.main,
  },
  bottomLinkContainer: {
    margin: theme.spacing(2, "auto"),
  },
  textContent: {
    marginTop: theme.spacing(1),
    maxWidth: "100%",
    fontSize: "1.3em",
    whiteSpace: "pre-line",
    letterSpacing: 1,
    wordBreak: "break-word",
  },
  indexPart: {
    fontSize: "1.7em",
  },
  deleteLink: {
    cursor: "pointer",
    color: "#FFF",
    backgroundColor: theme.palette.red.main,
    padding: theme.spacing(1),
    fontSize: "1.6em",
    transitionDuration: "0.5s",
    marginRight: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.red.dark,
    },
  },
  continueLink: {
    color: "#FFF",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1),
    fontSize: "1.6em",
    transitionDuration: "0.5s",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  endContainer: {
    margin: theme.spacing(3, "auto", 4),
  },
}))
