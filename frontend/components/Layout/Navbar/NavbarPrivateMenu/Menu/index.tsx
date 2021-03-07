import { Link } from "../../../../index"
import { ListItemIcon, Menu, MenuItem, withStyles, ListItemText, Paper } from "@material-ui/core"
import { AccountCircle, ExitToApp, Help } from "@material-ui/icons"
import useStyles from "./styles"
import { useSelector, useDispatch } from "react-redux"
import actions from "../../../../../store/actions"

type StyledMenuItemProps = {
  children: React.ReactNode
  onClick?: () => void
}

const StyledMenuItem = ({ children, onClick }: StyledMenuItemProps) => {
  const classes = useStyles()
  return (
    <MenuItem classes={{ root: classes.menuItem }} autoFocus={false} onClick={onClick}>
      {children}
    </MenuItem>
  )
}

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
        <StyledMenuItem>
          <ListItemIcon classes={{ root: classes.icon }}>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Tu perfil" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon classes={{ root: classes.icon }}>
            <Help />
          </ListItemIcon>
          <ListItemText primary="Ayuda" />
        </StyledMenuItem>
        <StyledMenuItem onClick={logOut}>
          <ListItemIcon classes={{ root: classes.icon }}>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Salir" />
        </StyledMenuItem>
        {/* <MenuItem component={Link} href="/story/add" className={classes.sectionMobile}>
          Crear historia
        </MenuItem>
        <MenuItem component={Link} href="/help">
          Ayuda
        </MenuItem>
        <hr></hr>
        <MenuItem
          onClick={() => {
            handleAvatarMenuClose()
            dispatch(actions.deauthenticate())
          }}
        >
          Salir
        </MenuItem> */}
      </Menu>
    )
  }
  return <></>
}
