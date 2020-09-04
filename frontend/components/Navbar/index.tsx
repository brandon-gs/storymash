// Hooks
import { useSelector } from "../../Hooks/"
import useStyles from "./styles"
// Components
import HideOnScroll from "./HideOnScroll"
import { AppBar, Toolbar, Typography } from "@material-ui/core"
import NavbarPrivateMenu from "./NavbarPrivateMenu"
import NavbarPublicMenu from "./NavbarPublicMenu"
import { Link } from ".."
// Icons
import { MenuBook } from "@material-ui/icons"

export default function Navbar(): React.ReactElement {
  const classes = useStyles()
  const { user } = useSelector(state => state.authentication)
  // eslint-disable-next-line no-console
  console.log(user)

  return (
    <>
      <HideOnScroll>
        <AppBar color="primary">
          <Toolbar>
            <Link href="/" className={classes.logo} naked>
              <Typography variant="h6" color="inherit" className={classes.containerLogo}>
                <MenuBook></MenuBook>
                STORYBOX
              </Typography>
            </Link>
            <div className={classes.grow}></div>
            <NavbarPublicMenu />
            <NavbarPrivateMenu />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />
    </>
  )
}
