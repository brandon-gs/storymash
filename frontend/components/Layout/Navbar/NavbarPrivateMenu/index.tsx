import React from "react"
// Components
import { InputBase, Button } from "@material-ui/core"
import AvatarMenu from "./AvatarMenu"
import { Link, MenuTabs } from "components/"
// Icons
import SearchIcon from "@material-ui/icons/Search"
// Hooks
import { useSelector } from "react-redux"
import useStyles from "./styles"

export default function NavbarPrivateMenu(): JSX.Element {
  const classes = useStyles()
  const { user } = useSelector(state => state.authentication)

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

        <AvatarMenu />
      </>
    )
  }
  return <></>
}
