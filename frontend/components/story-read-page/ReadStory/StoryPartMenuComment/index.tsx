import React, { useState } from "react"
import {
  IconButton,
  ListItemIcon,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@material-ui/core"
import { Delete, Edit, MoreVert } from "@material-ui/icons"

interface StoryPartMenuCommentProps {
  commentId: string
  onPressEdit: () => void
  onPressDelete: () => void
}

export default function StoryPartMenuComment({
  commentId,
  onPressEdit,
  onPressDelete,
}: StoryPartMenuCommentProps) {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null)
  const avatarMenuId = `comment-menu-${commentId}`

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null) => {
    if (event) {
      setAnchorEl(event.currentTarget)
    }
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        onClick={handleMenuOpen}
        aria-label="acciones del comentario"
        className={classes.iconSettings}
      >
        <MoreVert />
      </IconButton>
      <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        id={avatarMenuId}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuList>
          <MenuItem onClick={onPressEdit}>
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Editar</Typography>
          </MenuItem>
          <MenuItem onClick={onPressDelete}>
            <ListItemIcon>
              <Delete fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Eliminar</Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}

const useStyles = makeStyles(theme => ({
  iconSettings: {
    padding: theme.spacing(1),
    color: theme.palette.grey[600],
  },
}))
