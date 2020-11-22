// Components
import { Avatar, InputBase, Button, Chip } from "@material-ui/core"
import AvatarMenu from "./Menu"
import { Link, MenuTabs } from "../../../index"
// Icons
import SearchIcon from "@material-ui/icons/Search"
// Hooks
import React, { useState } from "react"
import { useSelector } from "react-redux"
import useStyles from "./styles"

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
        <MenuTabs />
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
        <Chip
          avatar={
            <Avatar
              alt="mostrar mas"
              aria-label="settings of user"
              aria-haspopup="true"
              color="inherit"
              className={classes.avatar}
              src={user.image}
            />
          }
          onClick={handleAvatarMenuOpen}
          aria-controls={avatarMenuId}
          label={user.username + "▼"}
          color="primary"
          className={classes.chip}
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
