import React, { useState } from "react"
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Typography,
  ListItemSecondaryAction,
  makeStyles,
} from "@material-ui/core"
import clsx from "clsx"
import TimeAgo from "timeago-react"
import StoryPartMenuComment from "../StoryPartMenuComment"
import { useCommentsService, useIsMounted } from "hooks"
import StoryPartCreateComment, { StoryPartCreateCommentProps } from "../StoryPartCreateComment"

interface StoryPartCommentProps extends StoryPartCreateCommentProps {
  story: Story
  commentIndex: number
  storyId: string
  comment: StoryPartComment
}

export default function StoryPartComment({
  story,
  commentIndex,
  storyId,
  comment,
  ...createCommentProps
}: StoryPartCommentProps) {
  const classes = useStyles()

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const { mounted } = useIsMounted()
  const { deleteComment } = useCommentsService(storyId, createCommentProps.indexPart)

  return isEditing ? (
    <Box mt={3}>
      <StoryPartCreateComment
        {...createCommentProps}
        storyId={storyId}
        indexComment={commentIndex}
        isEditing={isEditing}
        removeEditingMode={() => setIsEditing(false)}
        defaultValue={comment.content}
      />
    </Box>
  ) : (
    <ListItem
      className={classes.listItem}
      alignItems="flex-start"
      key={`${storyId}-${commentIndex}`}
    >
      <ListItemAvatar>
        <Avatar alt={`Comentario de ${story.author.username}`} src={story.author.image} />
      </ListItemAvatar>

      <ListItemText
        primary={
          <Box mb={0.3}>
            <Typography
              component="p"
              variant="body1"
              className={clsx(classes.username, classes.inline)}
            >
              {story.author.username}
            </Typography>
            {mounted && (
              <TimeAgo
                locale="es"
                datetime={comment.createdAt}
                className={clsx(classes.createdAt, classes.inline)}
              />
            )}
          </Box>
        }
        secondary={
          <Typography
            component="span"
            variant="body2"
            className={classes.commentContent}
            style={{ display: "inline" }}
            color="textPrimary"
          >
            {comment.content}
          </Typography>
        }
        style={{ padding: 0 }}
      />

      {/** Icon to edit or delete this comment ONLY show when User is the owner of the comment */}
      {createCommentProps.userId === story.author._id && (
        <ListItemSecondaryAction className={classes.secondaryAction}>
          <StoryPartMenuComment
            commentIndex={commentIndex}
            onPressEdit={() => setIsEditing(true)}
            onPressDelete={() => deleteComment(commentIndex)}
          />
        </ListItemSecondaryAction>
      )}
    </ListItem>
  )
}

const useStyles = makeStyles(theme => ({
  username: {
    fontWeight: theme.typography.fontWeightBold,
  },
  listItem: {
    padding: theme.spacing(0),
    marginBottom: theme.spacing(1),
  },
  createdAt: {
    color: theme.palette.grey[600],
    marginLeft: theme.spacing(1),
  },
  secondaryAction: {
    top: 27,
    right: 0,
    zIndex: 100,
  },
  commentContent: {
    maxWidth: "85%",
  },
  inline: {
    display: "inline",
  },
}))
