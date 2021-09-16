import React from "react"
import {
  ClickAwayListener,
  Grow,
  IconButton,
  makeStyles,
  MenuList,
  Paper,
  Popper,
} from "@material-ui/core"
import { Delete, Edit, MoreVert } from "@material-ui/icons"
import { ListMenuItem } from "components"
import useListMenu from "hooks/useListMenu"

interface StoryPartMenuCommentProps {
  commentIndex: number
  onPressEdit: () => void
  onPressDelete: () => void
}

export default function StoryPartMenuComment({
  commentIndex,
  onPressEdit,
  onPressDelete,
}: StoryPartMenuCommentProps) {
  const classes = useStyles()

  const { open, anchorRef, handleToggle, handleClose, handleListKeyDown } =
    useListMenu<HTMLButtonElement>()

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleToggle}
        aria-label="acciones del comentario"
        className={classes.iconSettings}
      >
        <MoreVert />
      </IconButton>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="left-start"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}
          >
            <Paper className={classes.menu}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={false}
                  id={`menu-comment-list-grow-${commentIndex}`}
                  onKeyDown={handleListKeyDown}
                >
                  <ListMenuItem
                    onClick={(e: React.MouseEvent<EventTarget, MouseEvent>) => {
                      handleClose(e)
                      onPressEdit()
                    }}
                    Icon={<Edit fontSize="small" className={classes.icon} />}
                    primary="Editar"
                    className={classes.menuItem}
                    listItemIconClasses={classes.listIcon}
                  />
                  <ListMenuItem
                    onClick={(e: React.MouseEvent<EventTarget, MouseEvent>) => {
                      handleClose(e)
                      onPressDelete()
                    }}
                    Icon={<Delete fontSize="small" className={classes.icon} />}
                    primary="Eliminar"
                    className={classes.menuItem}
                    listItemIconClasses={classes.listIcon}
                  />
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

const useStyles = makeStyles(theme => ({
  iconSettings: {
    padding: theme.spacing(1),
    color: theme.palette.grey[600],
  },
  menu: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
  menuItem: {
    color: theme.palette.primary.contrastText,
    transition: theme.transitions.create(["background-color"]),
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
    "&:focus": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
  icon: {
    color: theme.palette.primary.contrastText,
  },
  listIcon: {
    minWidth: 40,
  },
}))
