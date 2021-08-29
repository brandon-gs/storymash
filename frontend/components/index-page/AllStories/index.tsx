// Helpers
import actions from "../../../store/actions"
import debounce from "just-debounce-it"
// Components
import { Container, Typography } from "@material-ui/core"
import { Link, ListStories } from "../../index"
// Hooks
import { RefObject, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNearScreen } from "../../../hooks"
import useStyles from "./styles"

export default function AllStories() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isNearScreen, fromRef } = useNearScreen({ once: false, distance: 600 })
  const { stories } = useSelector(state => state)

  useEffect(() => {
    let mounted = true

    const getDataStories = debounce(() => {
      dispatch(actions.asyncUpdateDataStories(stories))
    }, 200)

    if (mounted && isNearScreen && stories.hasNextPage) {
      getDataStories()
    }

    return () => {
      mounted = false
    }
  }, [isNearScreen])

  if (stories.docs.length > 0) {
    return (
      <Container maxWidth={"lg"}>
        <ListStories stories={stories.docs} />
        {stories.hasNextPage ? (
          <div style={{ width: "100%", height: "500px" }} />
        ) : (
          <>
            <Typography
              component={"h3"}
              variant={"h4"}
              align={"center"}
              className={classes.textMarginTop}
            >
              Ya no hay más historias.
            </Typography>
            <Typography
              component={"h3"}
              variant={"h5"}
              align={"center"}
              className={classes.textMarginBot}
            >
              ¡Ayuda a nuestra comunidad{" "}
              <Link href={"/story/add"} underline={"none"}>
                creando una historia!
              </Link>
            </Typography>
          </>
        )}
        <div ref={fromRef as RefObject<HTMLDivElement>} />
      </Container>
    )
  }
  return (
    <>
      <Typography
        component={"h3"}
        variant={"h4"}
        align={"center"}
        className={classes.textMarginTop}
      >
        Aún no hay historias publicadas.
      </Typography>
      <Typography
        component={"h3"}
        variant={"h5"}
        align={"center"}
        className={classes.textMarginBot}
      >
        ¡Ayuda a nuestra comunidad{" "}
        <Link href={"/story/add"} underline={"none"}>
          creando la primera historia!
        </Link>
      </Typography>
    </>
  )
}
