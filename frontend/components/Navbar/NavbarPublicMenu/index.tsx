// Components
import { Button } from "@material-ui/core"
import { Link } from "../../"
// Hooks
import useStyles from "./styles"

export default function PrivateSection(): React.ReactElement {
  const classes = useStyles()

  return (
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
  )
}
