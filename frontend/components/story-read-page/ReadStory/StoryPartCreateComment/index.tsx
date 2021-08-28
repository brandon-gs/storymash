import React, { ChangeEvent, FormEvent } from "react"
import {
  Avatar,
  Button,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  makeStyles,
} from "@material-ui/core"
import { useCommentsService } from "hooks"
import { useState } from "react"
import clsx from "clsx"

export interface StoryPartCreateCommentProps {
  userId: string
  userImage: string
  indexPart: number
  storyPartId?: string
  className?: string
  defaultValue?: string
  isEditing?: boolean
  idComment?: string
  removeEditingMode?: () => void
}

export default function StoryPartCreateComment({
  userId,
  userImage,
  storyPartId = "",
  indexPart,
  className,
  defaultValue = "",
  isEditing = false,
  idComment = "",
  removeEditingMode,
}: StoryPartCreateCommentProps) {
  const classes = useStyles()

  const [comment, setComment] = useState<string>(defaultValue)
  const [onFocus, setOnFocus] = useState<boolean>(false)

  const { sendComment, editComment } = useCommentsService(storyPartId, indexPart)

  const handleChangeComment = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
  }

  const handleClearComment = () => setComment("")

  const handleCancelComment = () => {
    handleClearComment()
    setOnFocus(false)
    if (isEditing) {
      removeEditingMode && removeEditingMode()
    }
  }

  const handleSendComment = async (e: FormEvent) => {
    e.preventDefault()
    if (isEditing) {
      editComment(idComment, comment, removeEditingMode)
      return
    }
    sendComment(comment, handleClearComment)
  }

  return userId && userImage ? (
    <ListItem alignItems="flex-start" className={clsx(className, classes.listItem)}>
      <ListItemAvatar>
        <Avatar alt="Autor del comentario" src={userImage} />
      </ListItemAvatar>
      <ListItemText>
        <form autoComplete="off" onSubmit={handleSendComment}>
          <Grid container direction="row" spacing={1} className={classes.space}>
            <Grid item xs={12}>
              <TextField
                name="comment"
                value={comment}
                placeholder={"Agregar un comentario"}
                multiline
                fullWidth
                onFocus={() => setOnFocus(true)}
                onChange={handleChangeComment}
              />
            </Grid>
            {(onFocus || isEditing) && (
              <Grid container item xs={12} justifyContent="flex-end">
                <Grid item className={classes.cancelButton}>
                  <Button
                    size="small"
                    variant="contained"
                    color="default"
                    onClick={handleCancelComment}
                  >
                    Cancelar
                  </Button>
                </Grid>
                <Grid item>
                  <Button type="submit" size="small" variant="contained" color="primary">
                    {isEditing ? "Guardar" : "Comentar"}
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </form>
      </ListItemText>
    </ListItem>
  ) : null
}

const useStyles = makeStyles(theme => ({
  cancelButton: {
    marginRight: theme.spacing(1),
  },
  listItem: {
    paddingRight: theme.spacing(2),
  },
  noPaddingRight: {
    paddingRight: theme.spacing(0),
  },
  space: {
    marginTop: theme.spacing(0),
  },
  btnSend: {
    marginLeft: theme.spacing(2),
  },
  avatarComment: {
    height: theme.spacing(5),
    width: theme.spacing(5),
  },
}))
