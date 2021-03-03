import actions from "../../../store/actions"
// Components
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Box,
} from "@material-ui/core"
import { Visibility, VisibilityOff } from "@material-ui/icons"
import { Link, Copyright } from "../../index"
// Hooks
import useStyles from "./styles"
import { useDispatch } from "react-redux"
import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/router"

export default function LoginForm(): JSX.Element {
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()

  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await dispatch(actions.authenticate(values, "login", router.asPath))
  }

  const handleChange = (prop: string) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Nombre de usuario o correo electrónico"
            name="username"
            onChange={handleChange("username")}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={85}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Iniciar sesión
      </Button>
      <Grid container justify="flex-end">
        <Grid item>
          <Link href="/register" variant="body2">
            ¿No tienes una cuenta? Crea una
          </Link>
        </Grid>
      </Grid>
      <Box mt={5}>
        <Copyright />
      </Box>
    </form>
  )
}
