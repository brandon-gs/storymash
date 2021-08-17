// Components
import { Container, Grid, Typography } from "@material-ui/core"
import { Link, ListStories } from "../../index"
// Icons
import { SentimentDissatisfied } from "@material-ui/icons"
// Hooks
import { useDispatch, useSelector } from "react-redux"
import useStyles from "./styles"
import { useRouter } from "next/router"
import { useNearScreen } from "../../../hooks"
import React, { Fragment, RefObject, useEffect } from "react"
import debounce from "just-debounce-it"
import actions from "../../../store/actions"

export default function ProfileStories(): JSX.Element | null {
  const { profile } = useSelector(state => state.app)
  const { docs } = useSelector(state => state.stories)

  if (!profile) {
    return null
  }

  if (docs.length > 0) {
    return <ShowStories />
  }

  return <NoStories />
}

function NoStories(): JSX.Element {
  const classes = useStyles()
  const router = useRouter()

  const { user } = useSelector(state => state.authentication)
  const { username } = router.query

  const message =
    user?.username === username ? "Aún no tienes historias." : `${username} aún no tiene historias.`

  return (
    <Container maxWidth="md" component="section" className={classes.storiesContainer}>
      <Grid component="article" container alignItems="center" direction="column">
        <Grid container justifyContent="center" alignItems="center">
          <SentimentDissatisfied className={classes.noStoriesIcon} color="primary" />
          <h3>{message}</h3>
        </Grid>
      </Grid>
    </Container>
  )
}

function ShowStories(): JSX.Element {
  // Styles
  const classes = useStyles()
  // Redux dispatch
  const dispatch = useDispatch()

  // NearScreen to use infinite scroll
  const { isNearScreen, fromRef } = useNearScreen({ once: false, distance: 600 })

  // Redux state
  const {
    stories,
    app: { profile },
    authentication: { user },
  } = useSelector(state => state)

  useEffect(() => {
    if (isNearScreen && stories.hasNextPage) {
      const getDataStories = debounce(() => {
        dispatch(actions.asyncUpdateDataStories(stories))
      }, 200)
      getDataStories()
    }
  }, [isNearScreen])

  // Messages
  const isCurrentUserProfile = profile?.username === user?.username
  const noStoriesMessages = isCurrentUserProfile
    ? "Ya no tienes más historias"
    : `${profile?.username} ya no tiene más historias.`

  if (stories.docs.length > 0 && profile) {
    return (
      <Container maxWidth="lg" className={classes.storiesContainer}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Historias de {profile.username}
        </Typography>
        <ListStories stories={stories.docs} />
        {stories.hasNextPage ? (
          <div style={{ width: "100%", height: "500px" }} />
        ) : (
          <Fragment>
            <Typography
              component={"h3"}
              variant={"h4"}
              align={"center"}
              className={classes.textMarginTop}
            >
              {noStoriesMessages}
            </Typography>
            {isCurrentUserProfile && (
              <Fragment>
                <Typography component={"h3"} variant={"h5"} align={"center"}>
                  <Link href={"/story/add"} underline={"none"}>
                    ¡Crea una nueva historia!
                  </Link>
                </Typography>
                <Typography component={"h3"} variant={"h5"} align={"center"}>
                  O
                </Typography>
              </Fragment>
            )}
            <Typography
              component={"h3"}
              variant={"h5"}
              align={"center"}
              className={classes.textMarginBot}
            >
              <Link href={"/"} underline={"none"}>
                ¡Mira historias de otros escritores!
              </Link>
            </Typography>
          </Fragment>
        )}
        <div ref={fromRef as RefObject<HTMLDivElement>} />
      </Container>
    )
  }
  return <h1>No tienes historias</h1>
}
