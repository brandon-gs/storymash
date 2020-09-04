// Components
import { Button } from "@material-ui/core"
import { Link } from "../../"
// Hooks
import useStyles from "./styles"
import { useSelector } from "../../../Hooks"

export default function PrivateSection(): React.ReactElement | null {
  const classes = useStyles()
  const { auth } = useSelector(state => state.authentication)
  if (!auth) {
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
          underline="none"
        >
          Crear cuenta
        </Button>
      </div>
    )
  }
  return null
}
