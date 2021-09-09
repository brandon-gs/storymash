// Components
import { Box, makeStyles } from "@material-ui/core"
import { Container, Typography } from "@material-ui/core"
import { useSelector } from "react-redux"
import { RedirectOption } from "../NotFound"

export default function NotFound() {
  const { user } = useSelector(state => state.authentication)
  const styles = useStyles()

  return (
    <Box mt={2}>
      <Container maxWidth="sm" className={styles.root}>
        <Box mb={1}>
          <img src="/img/not_follow.png" className={styles.image} />
        </Box>
        <Typography component="p" variant="subtitle1" className={styles.message}>
          {user && user.following.length === 0
            ? "Aun no sigues a ningún usuario."
            : "Los usuarios a los que sigues aún no tienen historias publicadas."}
        </Typography>
        <Box mt={3} mb={3}>
          <RedirectOption />
        </Box>
      </Container>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
  },
  image: {
    width: "80%",
    height: "80%",
  },
  message: {
    fontSize: 18,
  },
}))
