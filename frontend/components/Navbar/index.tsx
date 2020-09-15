// Hooks
import useStyles from "./styles"
// Components
import HideOnScroll from "./HideOnScroll"
import { AppBar, Toolbar, Typography } from "@material-ui/core"
import NavbarPrivateMenu from "./NavbarPrivateMenu"
import NavbarPublicMenu from "./NavbarPublicMenu"
import { Link } from ".."
// Icons
import { MenuBook } from "@material-ui/icons"
import { Fragment } from "react"

export default function Navbar(): React.ReactElement {
  const classes = useStyles()
  return (
    <Fragment>
      <HideOnScroll>
        <AppBar color="primary">
          <Toolbar>
            <Link href="/" className={classes.logo} naked>
              <Typography variant="h6" color="inherit" className={classes.containerLogo}>
                <MenuBook></MenuBook>
                STORYMASH
              </Typography>
            </Link>
            <div className={classes.grow}></div>
            <NavbarPublicMenu />
            <NavbarPrivateMenu />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />
    </Fragment>
  )
}
