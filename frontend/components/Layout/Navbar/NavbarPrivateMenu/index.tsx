// Components
import { Avatar, InputBase, Button } from "@material-ui/core"
import AvatarMenu from "./Menu"
import { Link } from "components"
// Icons
import { Search as SearchIcon } from "@material-ui/icons"
// Hooks
import React, { useState } from "react"
import { useSelector } from "react-redux"
import useStyles from "./styles"

export default function NavbarPrivateMenu(): JSX.Element {
  const classes = useStyles()
  const { user } = useSelector(state => state.authentication)

  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLElement) | null>(null)

  const isAvatarMenuOpen = Boolean(anchorEl)

  const avatarMenuId = "account-menu"

  const handleAvatarMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
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
        <div className={classes.grow} />
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
        {/* <IconButton
          className={classes.moreIcon}
          onClick={handleAvatarMenuOpen}
          aria-haspopup="true"
          aria-controls={avatarMenuId}
          aria-label="settings of user"
        >
          <MenuIcon />
        </IconButton>
        */}
        <AvatarMenu
          anchorEl={anchorEl}
          avatarMenuId={avatarMenuId}
          isAvatarMenuOpen={isAvatarMenuOpen}
          handleAvatarMenuClose={handleAvatarMenuClose}
        />
        <Avatar
          alt="mostrar mas"
          color="inherit"
          className={classes.avatar}
          src={user.image}
          onClick={handleAvatarMenuOpen}
        />
      </>
    )
  }
  return <></>
}
