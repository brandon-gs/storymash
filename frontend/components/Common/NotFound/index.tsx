// Components
import Image from "next/image"
import Link from "../Link"
import { Box, makeStyles } from "@material-ui/core"
import { Container, Typography } from "@material-ui/core"
// Hooks
import { useSelector } from "react-redux"

export default function NotFound() {
  const styles = useStyles()

  return (
    <Box pt={7}>
      <Container maxWidth="sm" className={styles.root}>
        <Box mb={2} maxWidth="sm">
          <Image
            src="/icons/PageNotFound.svg"
            className={styles.image}
            width="74%"
            height="32%"
            layout="responsive"
            quality={90}
          />
        </Box>
        <Typography component="h1" variant="h6">
          Esta página no está disponible
        </Typography>
        <Typography component="p" variant="subtitle1">
          Es posible que el enlace esté roto o que se haya eliminado la página. Verifica que el
          enlace que quieres abrir es correcto.
        </Typography>
        <Box mt={5}>
          <RedirectOption />
        </Box>
      </Container>
    </Box>
  )
}

export function RedirectOption() {
  const styles = useStyles()
  const {
    authentication: { auth },
  } = useSelector(state => state)
  return auth ? (
    <Link naked href="/" className={styles.link}>
      Ir a la sección de historias
    </Link>
  ) : (
    <>
      <Link naked href="/login" className={styles.link}>
        Iniciar sesión
      </Link>
      <Link naked href="/register" className={styles.secondaryLink}>
        Crear cuenta
      </Link>
    </>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
  },
  image: {
    width: "64%",
  },
  link: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(0.5),
    fontSize: theme.typography.subtitle1.fontSize,
    textDecoration: "none",
    "&:hover": {
      background: theme.palette.primary.light,
    },
    transition: theme.transitions.create(["background-color"]),
  },
  secondaryLink: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(0.5),
    fontSize: theme.typography.subtitle1.fontSize,
    textDecoration: "none",
    "&:hover": {
      background: theme.palette.secondary.light,
    },
    transition: theme.transitions.create(["background-color"]),
    marginLeft: theme.spacing(3),
  },
}))
