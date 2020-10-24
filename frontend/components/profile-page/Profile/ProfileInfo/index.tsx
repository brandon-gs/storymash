// Components
import { Container, Grid, Avatar, Button, Typography, Hidden } from "@material-ui/core"
import { ButtonFollow } from "../../../index"
import Files from "react-butterfiles"
// Hooks
import useStyles from "./styles"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
// Icons
import { PhotoCamera, Favorite, Book, People, Grade, Comment } from "@material-ui/icons"
// Helpers
import actions from "../../../../store/actions"
import { getColorFromLevel } from "./helpers"
import ProfileAbout from "../ProfileAbout"
import { getUploadErrorMessage } from "../../../../utils"

export default function ProfileInfo(): JSX.Element {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    app: { profile },
    authentication: { user, token },
  } = useSelector(state => state)
  const [renderOnClient, setRenderOnClient] = useState<boolean>(false)

  useEffect(() => {
    setRenderOnClient(true)
  }, [])

  const uploadProfileImage = async (images: Array<any>) => {
    const image = images[0]
    const { file } = image.src
    file.id = image.id
    dispatch(actions.updatePhotoProfile(file, token))
  }

  const handleErrorUploadImage = (errors: Array<any>) => {
    const error = errors[0]
    const message = getUploadErrorMessage(error.type)
    dispatch(actions.updateAlert({ message, severity: "error", open: true }))
    setTimeout(() => {
      dispatch(actions.removeAlert())
    }, 5000)
  }

  if (profile) {
    return (
      <Container className={classes.root} maxWidth="sm">
        <Grid container spacing={4} justify="center">
          <Grid item className={classes.imageContainer}>
            <Avatar
              alt="mostrar mas"
              aria-label="settings of user"
              aria-haspopup="true"
              color="inherit"
              src={profile.image}
              className={classes.imageProfile}
            />
            {renderOnClient && profile.username === user?.username && (
              <Files
                multiple={false}
                maxSize="2mb"
                accept={["image/jpg", "image/jpeg", "image/png"]}
                onSuccess={uploadProfileImage}
                onError={handleErrorUploadImage}
              >
                {({ browseFiles }: FilesProps) => (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={browseFiles}
                    className={classes.buttonChangeImage}
                    endIcon={<PhotoCamera />}
                  >
                    Cambiar
                  </Button>
                )}
              </Files>
            )}
          </Grid>
          <Grid item sm>
            <Grid container spacing={5}>
              <Grid item>
                <h2 className={classes.username}>{profile.username}</h2>
                <Typography variant="body2" paragraph>
                  <Favorite fontSize="small" className={classes.iconHeart} /> {`${profile.likes} `}
                  {profile.likes === 1 ? "Like" : "Likes"}
                </Typography>
                <Typography variant="body2" paragraph>
                  <Comment fontSize="small" color="primary" /> {`${profile.comments} `}
                  {profile.comments === 1 ? "Comentario" : "Comentarios"}
                </Typography>
              </Grid>
              <Grid item>
                {profile.username === user?.username && (
                  <div className={classes.spaceButtonFollow}></div>
                )}
                {!(profile.username === user?.username) && (
                  <>
                    <Hidden smUp>
                      <div className={classes.spaceButtonFollow}></div>
                    </Hidden>
                    <Hidden xsDown>
                      <ButtonFollow />
                    </Hidden>
                  </>
                )}
                <Typography variant="body2" paragraph>
                  <Book fontSize="small" color="primary" /> {`${profile.stories.length} `}
                  {profile.stories.length === 1 ? "Historia" : "Historias"}
                </Typography>
                <Typography variant="body2" paragraph className={classes.followersContainer}>
                  <People fontSize="small" color="primary" className={classes.iconFollowers} />{" "}
                  {`${profile.followers.length} `}
                  {profile.followers.length === 1 ? "Seguidor" : "Seguidores"}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="body2" paragraph className={classes.followersContainer}>
                <span style={{ color: getColorFromLevel(profile.level) }}>
                  <Grade fontSize="small" />
                </span>{" "}
                Nivel {profile.level} <span>({profile.points} puntos)</span>
              </Typography>
            </Grid>
            <Grid item>
              <Hidden smUp>
                <ButtonFollow />
              </Hidden>
            </Grid>
          </Grid>
          <Grid item className={classes.itemAbout}>
            <ProfileAbout />
          </Grid>
        </Grid>
      </Container>
    )
  }
  return <></>
}
