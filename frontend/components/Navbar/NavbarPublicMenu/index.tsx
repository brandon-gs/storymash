// Components
import { MenuItem, Menu, Button, IconButton } from "@material-ui/core"
import { Link } from "../../"
// Icons
import { MoreVert } from "@material-ui/icons"
// Hooks
import { useState } from "react"
import useStyles from "./styles"

export default function PrivateSection(): React.ReactElement {
  const classes = useStyles()
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const mobileMenuId = "primary-search-account-menu-mobile"

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      transitionDuration={500}
    >
      <MenuItem component={Link} href="/">
        Inicio
      </MenuItem>
      <MenuItem component={Link} href="/login">
        Iniciar sesión
      </MenuItem>
      <MenuItem component={Link} href="/register" className={classes.menuItemRegiser}>
        Crear cuenta
      </MenuItem>
    </Menu>
  )

  return (
    <>
      <div className={classes.sectionDesktop}>
        <Link naked href="/" activeClassName={classes.linkActive} className={classes.link}>
          Inicio
        </Link>
        <Link naked href="/login" activeClassName={classes.linkActive} className={classes.link}>
          Iniciar sesión
        </Link>
        <Button
          component={Link}
          href="/register"
          aria-label="create account for user"
          variant="contained"
          color="secondary"
        >
          Crear cuenta
        </Button>
      </div>
    </>
  )
}
