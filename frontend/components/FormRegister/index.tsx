import {
  Grid,
  Avatar,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Button,
  Box,
  Paper,
  Checkbox,
} from "@material-ui/core"
import { Link, Copyright } from ".."
import { LockOutlined, Visibility, VisibilityOff } from "@material-ui/icons"
import { useState, FormEvent, ChangeEvent } from "react"
import useStyles from "./styles"
import validate from "./validate"
import {
  ages,
  registerFormInitialValues,
  registerFormInitialErrors,
  normalizeName,
  normalizeValues,
} from "./helpers"
import { useDispatch } from "react-redux"
import actions from "../../store/actions"
import { useRouter } from "next/router"

export default function FormRegister(): React.ReactElement {
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()
  const [values, setValues] = useState<RegisterForm>(registerFormInitialValues)
  const [errors, setErrors] = useState<RegisterFormErrors>(registerFormInitialErrors)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const errors = await validate(values)
    setErrors(errors)
    if (!errors.hasError) {
      values.firstName = normalizeName(values.firstName)
      values.lastName = normalizeName(values.lastName)
      await dispatch(actions.authenticate(values, "register", router.asPath))
    }
  }

  const handleChange = (prop: string) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target
    const newValues = normalizeValues(values, prop, value)
    setValues(newValues)
    setErrors({ ...errors, [prop]: "" })
  }

  const handleChangeSelect = (event: ChangeEvent<{ name?: string | null; value: unknown }>) => {
    const { name, value } = event.target
    if (name) {
      setValues({ ...values, [name]: value })
      setErrors({ ...errors, [name]: "" })
    }
  }

  const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>, value: boolean) => {
    const { name } = event.target
    setValues({ ...values, [name]: value })
    setErrors({ ...errors, [name]: "" })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  return (
    <Grid component="main" container className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar} color="primary">
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h1" className={classes.title}>
            Crear cuenta
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  value={values.firstName}
                  variant="outlined"
                  label="Nombre"
                  onChange={handleChange("firstName")}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  autoFocus
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  label="Apellido"
                  name="lastName"
                  value={values.lastName}
                  autoComplete="lname"
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  onChange={handleChange("lastName")}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Nombre de usuario"
                  name="username"
                  value={values.username}
                  autoComplete="username"
                  error={!!errors.username}
                  helperText={errors.username}
                  onChange={handleChange("username")}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth error={!!errors.age}>
                  <InputLabel htmlFor="outlined-age-native-simple">Edad</InputLabel>
                  <Select
                    fullWidth
                    native
                    value={values.age}
                    onChange={handleChangeSelect}
                    label="Edad"
                    inputProps={{
                      name: "age",
                      id: "outlined-age-native-simple",
                    }}
                  >
                    <option aria-label="None" value="" />
                    {ages.map((age, idx) => (
                      <option value={age} key={`age-${idx}-key`}>
                        {age}
                      </option>
                    ))}
                  </Select>
                  <FormHelperText id="age-error">{errors.age}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth error={!!errors.gender}>
                  <InputLabel htmlFor="outlined-age-native-simple">Sexo</InputLabel>
                  <Select
                    fullWidth
                    native
                    value={values.gender}
                    onChange={handleChangeSelect}
                    label="Sexo"
                    inputProps={{
                      name: "gender",
                      id: "outlined-gender-native-simple",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option aria-label="Hombre" value="Hombre">
                      Hombre
                    </option>
                    <option aria-label="Mujer" value="Mujer">
                      Mujer
                    </option>
                    <option aria-label="Prefiero no especificar" value="Sin especificar">
                      Prefiero no especificar
                    </option>
                  </Select>
                  <FormHelperText id="age-error">{errors.gender}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Correo electrónico"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange("email")}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" required fullWidth error={!!errors.password}>
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
                    labelWidth={95}
                  />
                  <FormHelperText id="password-error">{errors.password}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl required error={!!errors.terms} component="fieldset">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.terms}
                        onChange={handleChangeCheckbox}
                        name="terms"
                        color="primary"
                      />
                    }
                    label="Acepto recibir correos electrónicos de STORYMASH"
                  />
                  <FormHelperText id="terms-error">{errors.terms}</FormHelperText>
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
              Crear cuenta
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  ¿Ya tienes cuenta? Inicia sesión
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}
