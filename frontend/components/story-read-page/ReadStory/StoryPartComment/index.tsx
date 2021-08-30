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
  comment: StoryPartComment
}

export default function StoryPartComment({
  comment,
  ...createCommentProps
}: StoryPartCommentProps) {
  const classes = useStyles()

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const { mounted } = useIsMounted()
  const { deleteComment } = useCommentsService(
    createCommentProps.storyPartId,
    createCommentProps.indexPart
  )

  return isEditing ? (
    <Box mt={3}>
      <StoryPartCreateComment
        {...createCommentProps}
        idComment={comment._id}
        isEditing={isEditing}
        removeEditingMode={() => setIsEditing(false)}
        defaultValue={comment.content}
      />
    </Box>
  ) : (
    <ListItem className={classes.listItem} alignItems="flex-start" key={comment._id}>
      <ListItemAvatar>
        <Avatar alt={`Comentario de ${comment.author.username}`} src={comment.author.image} />
      </ListItemAvatar>

      <ListItemText
        primary={
          <Box mb={0.3}>
            <Typography
              component="p"
              variant="body1"
              className={clsx(classes.username, classes.inline)}
            >
              {comment.author.username}
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
      {createCommentProps.userId === comment.author._id && (
        <ListItemSecondaryAction className={classes.secondaryAction}>
          <StoryPartMenuComment
            commentId={comment._id}
            onPressEdit={() => setIsEditing(true)}
            onPressDelete={() => deleteComment(comment._id)}
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
