import React, { useState } from "react"
import { makeStyles, Button, List, Fade } from "@material-ui/core"
import { Box } from "@material-ui/core"
import { QuestionAnswer } from "@material-ui/icons"
import StoryPartCreateComment, { StoryPartCreateCommentProps } from "../StoryPartCreateComment"
import StoryPartComment from "../StoryPartComment"

interface StoryPartListComments extends StoryPartCreateCommentProps {
  comments: StoryPartComment[]
  userId: string
}

export default function StoryPartListComments({
  comments,
  indexPart,
  userImage,
  userId,
  storyPartId,
}: StoryPartListComments) {
  const classes = useStyles()

  const [showComments, setShowComments] = useState<boolean>(false)

  return (
    <Box mt={5} mb={5}>
      <Button
        startIcon={<QuestionAnswer />}
        onClick={() => setShowComments(prev => !prev)}
        fullWidth
      >
        {!showComments ? "Ver comentarios" : "Ocultar comentarios"}
      </Button>
      <Fade in={showComments} style={{ height: showComments ? "auto" : 0 }}>
        <Box mt={2}>
          <List>
            <StoryPartCreateComment
              className={classes.listItem}
              indexPart={indexPart}
              userId={userId}
              userImage={userImage}
              storyPartId={storyPartId}
            />
            {comments.map(comment => (
              <StoryPartComment
                key={`list.commments-${comment._id}`}
                comment={comment}
                className={classes.listItem}
                indexPart={indexPart}
                userId={userId}
                userImage={userImage}
                storyPartId={storyPartId}
              />
            ))}
          </List>
        </Box>
      </Fade>
    </Box>
  )
}

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(0),
    marginBottom: theme.spacing(1),
  },
}))
