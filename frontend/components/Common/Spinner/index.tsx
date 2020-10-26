// Components
import { CircularProgress, Container } from "@material-ui/core"
// Hooks
import useStyles from "./styles"

export default function Spinner() {
  const classes = useStyles()
  return (
    <Container maxWidth={"sm"} component={"section"} className={classes.spinnerContainer}>
      <CircularProgress size={260} />
    </Container>
  )
}
