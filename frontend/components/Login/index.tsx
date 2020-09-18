// Components
import { Grid, Avatar, Typography, Paper } from "@material-ui/core"
import { FormLogin } from ".."

// Hooks
import useStyles from "./styles"
import { LockOutlined } from "@material-ui/icons"

export default function Login(): JSX.Element {
  const classes = useStyles()
  return (
    <Grid component="main" container className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h1" className={classes.title}>
            Iniciar sesión
          </Typography>
          <FormLogin />
        </div>
      </Grid>
    </Grid>
  )
}
