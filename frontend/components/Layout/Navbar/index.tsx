// Hooks
import useStyles from "./styles"
// Components
import Image from "next/image"
import HideOnScroll from "./HideOnScroll"
import { AppBar, Avatar, Toolbar } from "@material-ui/core"
import NavbarPrivateMenu from "./NavbarPrivateMenu"
import NavbarPublicMenu from "./NavbarPublicMenu"
import { Link } from "../../index"
import { Fragment } from "react"

export default function Navbar() {
  const classes = useStyles()
  return (
    <Fragment>
      <HideOnScroll>
        <AppBar color="primary">
          <Toolbar>
            <Avatar component={Link} href="/" className={classes.logo} naked alt={"Storymash logo"}>
              <Image
                src="/img/logo.png"
                width="100%"
                height="100%"
                layout="intrinsic"
                alt={"Storymash logo"}
                className={classes.imageLogo}
              />
            </Avatar>
            <NavbarPublicMenu />
            <NavbarPrivateMenu />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />
    </Fragment>
  )
}
