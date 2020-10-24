// Components
import { Avatar, InputBase, Button } from "@material-ui/core"
import { Link } from "../../../index"
// Icons
import SearchIcon from "@material-ui/icons/Search"
// Hooks
import { useState } from "react"
import { useSelector } from "react-redux"
import useStyles from "./styles"
// Redux
import AvatarMenu from "./Menu"

export default function NavbarPrivateMenu(): JSX.Element {
  const classes = useStyles()
  const { user } = useSelector(state => state.authentication)

  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLDivElement) | null>(null)

  const isAvatarMenuOpen = Boolean(anchorEl)

  const avatarMenuId = "account-menu"

  const handleAvatarMenuOpen = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | null) => {
    if (event) {
      setAnchorEl(event.currentTarget)
    }
  }
  const handleAvatarMenuClose = () => {
    setAnchorEl(null)
  }

  if (user) {
    return (
      <>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Buscar por título..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
        <div className={classes.sectionDesktop}>
          <Button
            aria-label="create account for user"
            variant="contained"
            color="secondary"
            component={Link}
            href="/story/add"
            underline="none"
            className={classes.buttonCreate}
          >
            Crear historia
          </Button>
        </div>
        <Avatar
          alt="mostrar mas"
          aria-label="settings of user"
          aria-haspopup="true"
          color="inherit"
          aria-controls={avatarMenuId}
          className={classes.avatar}
          onClick={handleAvatarMenuOpen}
          src={user.image}
        />
        <AvatarMenu
          anchorEl={anchorEl}
          avatarMenuId={avatarMenuId}
          isAvatarMenuOpen={isAvatarMenuOpen}
          handleAvatarMenuClose={handleAvatarMenuClose}
        />
      </>
    )
  }
  return <></>
}
