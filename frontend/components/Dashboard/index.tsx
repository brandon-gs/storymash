import useStyles from "./styles"
import { Grid, Typography, Container, Button } from "@material-ui/core"
import { Link } from ".."

export default function Dashboard(): JSX.Element {
  const classes = useStyles()
  return (
    <Container maxWidth="lg" className={classes.root}>
      <div className={classes.background}></div>
      <Grid container className={classes.message} spacing={3}>
        <Grid item md>
          <Typography component="h1" variant="h1" className={classes.title}>
            La comunidad favorita de lectores y escritores. Un lugar mágico donde las historias son
            las protagonistas.
          </Typography>
        </Grid>
        <Grid item md className={classes.imageContainer}>
          <img src="/img/login.jpg" className={classes.image}></img>
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="center">
        <Button
          color="secondary"
          variant="contained"
          component={Link}
          href="/register"
          className={classes.button}
        >
          Unirse a storymash
        </Button>
      </Grid>
    </Container>
  )
}
