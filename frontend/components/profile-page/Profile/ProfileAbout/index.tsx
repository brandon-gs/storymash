// Components
import { Container, Grid, IconButton, TextField, Button } from "@material-ui/core"
// Icons
import { Edit } from "@material-ui/icons"
// Hooks
import { useSelector } from "react-redux"
import useStyles from "./styles"
import { useState, ChangeEvent, FormEvent } from "react"
import { useDispatch } from "react-redux"
// Helpers
import actions from "../../../../store/actions"
import clsx from "clsx"

export default function ProfileAbout(): JSX.Element {
  const dispatch = useDispatch()
  const classes = useStyles()
  const {
    app: { profile },
    authentication: { user, token },
  } = useSelector(state => state)
  const [edit, setEdit] = useState<boolean>(false)
  const [about, setAbout] = useState<string>(profile && profile.about ? profile.about : "")

  const isMyProfile = profile?.username === user?.username

  const activateEdit = () => setEdit(true)
  const desactivateEdit = () => setEdit(false)

  const handleAboutChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAbout(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (user) {
        const newUser = user
        newUser.about = about
        desactivateEdit()
        dispatch(actions.updateLoader(true))
        dispatch(actions.asyncUpdateUser(token, { about }))
        dispatch(actions.updateProfile(newUser))
        dispatch(
          actions.updateAlert({
            message: "Información actualizada correctamente.",
            severity: "success",
          })
        )
        dispatch(actions.updateLoader(false))
      }
    } catch (error) {
      dispatch(
        actions.updateAlert({
          message: "Ocurrio en error al actualizar su informacion. Intentelo más tarde.",
          severity: "error",
        })
      )
    }
  }

  if (profile) {
    return (
      <>
        {((!isMyProfile && profile.about) || (isMyProfile && !edit)) && (
          <Container className={classes.root} maxWidth="sm" component="section">
            <Grid container>
              <Grid item xs>
                <p
                  className={
                    profile.about ? classes.textAbout : clsx(classes.textAbout, classes.textNoAbout)
                  }
                >
                  {profile.about ? profile.about : "Escribe acerca de ti..."}
                </p>
              </Grid>
              {isMyProfile && (
                <Grid item xs={1}>
                  <IconButton aria-label="edit" onClick={activateEdit}>
                    <Edit />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          </Container>
        )}
        {edit && isMyProfile && (
          <form onSubmit={handleSubmit}>
            <Container maxWidth="sm" component="section" className={classes.containerEdit}>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Escribe sobre ti..."
                    fullWidth
                    name="about"
                    value={about}
                    onChange={handleAboutChange}
                    label="Sobre ti"
                    variant="outlined"
                    rows={5}
                    rowsMax={5}
                    multiline
                  />
                </Grid>
                <Grid container className={classes.containerButtons} spacing={3} justify="flex-end">
                  <Grid item>
                    <Button
                      aria-label="Cancelar edicion de información sobre mí"
                      onClick={desactivateEdit}
                      startIcon={<Edit fontSize="inherit" />}
                      className={classes.buttonDelete}
                    >
                      Cancelar
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      aria-label="Guardar información sobre mí"
                      type="submit"
                      startIcon={<Edit fontSize="inherit" />}
                      className={classes.buttonSave}
                    >
                      Guardar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </form>
        )}
      </>
    )
  }
  return <></>
}
