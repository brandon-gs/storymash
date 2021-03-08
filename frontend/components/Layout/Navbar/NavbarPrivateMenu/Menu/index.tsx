import clsx from "clsx"
import { Link } from "components"
import { ListItemIcon, Menu, MenuItem, ListItemText } from "@material-ui/core"
import { AccountCircle, ExitToApp, Help, AddCircle } from "@material-ui/icons"
import useStyles from "./styles"
import { useSelector, useDispatch } from "react-redux"
import actions from "store/actions"

type Props = {
  anchorEl: Element | null
  avatarMenuId: string
  isAvatarMenuOpen: boolean
  handleAvatarMenuClose: () => void
}

export default function AvatarMenu({
  anchorEl,
  avatarMenuId,
  isAvatarMenuOpen,
  handleAvatarMenuClose,
}: Props): JSX.Element {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { user } = useSelector(state => state.authentication)

  const logOut = () => {
    handleAvatarMenuClose()
    dispatch(actions.deauthenticate())
  }

  if (user) {
    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        id={avatarMenuId}
        keepMounted
        open={isAvatarMenuOpen}
        onClose={handleAvatarMenuClose}
        style={{ top: -8 }}
        MenuListProps={{
          classes: {
            root: classes.menu,
          },
        }}
        classes={{
          paper: classes.menuPaper,
        }}
        autoFocus={false}
      >
        <MenuItem
          classes={{ root: classes.menuItem }}
          autoFocus={false}
          component={Link}
          href={`/profile/${user.username}`}
        >
          <ListItemIcon classes={{ root: classes.icon }}>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Tu perfil" />
        </MenuItem>
        <MenuItem
          classes={{ root: clsx(classes.menuItem, classes.createStoryItem) }}
          autoFocus={false}
          component={Link}
          href="/story/add"
        >
          <ListItemIcon classes={{ root: classes.icon }}>
            <AddCircle />
          </ListItemIcon>
          <ListItemText primary="Crear historia" />
        </MenuItem>
        <MenuItem
          classes={{ root: classes.menuItem }}
          autoFocus={false}
          component={Link}
          href="/help"
        >
          <ListItemIcon classes={{ root: classes.icon }}>
            <Help />
          </ListItemIcon>
          <ListItemText primary="Ayuda" />
        </MenuItem>
        <MenuItem classes={{ root: classes.menuItem }} autoFocus={false} onClick={logOut}>
          <ListItemIcon classes={{ root: classes.icon }}>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Salir" />
        </MenuItem>
      </Menu>
    )
  }
  return <></>
}
