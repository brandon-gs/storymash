import { Menu, MenuItem } from "@material-ui/core"
import { Link } from "../../.."

import useStyles from "./styles"
import { useSelector } from "../../../../Hooks"
import { useDispatch } from "react-redux"
import actions from "../../../../store/actions"

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
  if (user) {
    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={avatarMenuId}
        keepMounted
        open={isAvatarMenuOpen}
        onClose={handleAvatarMenuClose}
      >
        <MenuItem component={Link} href="/profile/[username]" as={`/profile/${user.username}`}>
          Mi perfil
        </MenuItem>
        <MenuItem component={Link} href="/story/add" className={classes.sectionMobile}>
          Crear historia
        </MenuItem>
        <MenuItem component={Link} href="/notifications">
          Mis notificaciones
        </MenuItem>
        <MenuItem component={Link} href="/settings">
          Configuración
        </MenuItem>
        <MenuItem component={Link} href="/help">
          ¿Ayuda?
        </MenuItem>
        <hr></hr>
        <MenuItem
          onClick={() => {
            handleAvatarMenuClose()
            dispatch(actions.deauthenticate())
          }}
        >
          Salir
        </MenuItem>
      </Menu>
    )
  }
  return <></>
}
