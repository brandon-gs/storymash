import clsx from "clsx"
// Components
import { Button } from "@material-ui/core"
import { Link } from "../../../index"
// Hooks
import useStyles from "./styles"
import { useSelector } from "react-redux"

export default function PrivateSection(): React.ReactElement | null {
  const classes = useStyles()
  const { auth } = useSelector(state => state.authentication)
  if (!auth) {
    return (
      <>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <Link
            naked
            href="/"
            activeClassName={clsx(classes.linkActive, classes.hideLink)}
            className={classes.link}
          >
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
      </>
    )
  }
  return null
}
