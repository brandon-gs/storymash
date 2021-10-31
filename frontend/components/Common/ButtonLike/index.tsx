import clsx from "clsx"
// Icons
import { Favorite, FavoriteBorderOutlined } from "@material-ui/icons"
// Hooks
import { useSelector, useDispatch } from "react-redux"
import useStyles from "./styles"
import actions from "../../../store/actions"
import Axios from "axios"
import { useState } from "react"
import { ModalLogin } from "../../index"

type Props = {
  storyPartIndex: number
  part: StoryPart
  story: Story
}

// Get icon from depend if a user is creator of history or if he liked the history
export default function LikeIcon({ storyPartIndex, part, story }: Props): JSX.Element {
  const { token, user } = useSelector(state => state.authentication)
  const { stories } = useSelector(state => state)
  const dispatch = useDispatch()
  const classes = useStyles()
  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false)

  const handleCloseModalLogin = () => {
    setOpenModalLogin(false)
  }

  const handleOpenModalLogin = () => {
    setOpenModalLogin(true)
  }

  const addOrRemoveLike = (option: "add" | "remove") => async () => {
    if (user) {
      try {
        // Update button icon
        const newStories = [...stories.docs]
        const storyIndex = stories.docs.map(({ _id }) => _id).indexOf(story._id)
        if (newStories.length > 0 && newStories[storyIndex]) {
          if (option === "add") {
            newStories[storyIndex].parts[storyPartIndex].likes.push(user._id)
          } else {
            newStories[storyIndex].parts[storyPartIndex].likes = newStories[storyIndex].parts[
              storyPartIndex
            ].likes.filter(likeUserId => likeUserId !== user._id)
          }
          dispatch(actions.updateStories(newStories))
        }
        // Do api call to add or remove like
        const { data } = await Axios.put(
          `/api/story/part/like/${option}/${story._id}/${storyPartIndex}`,
          {
            option,
          },
          {
            headers: {
              authorization: token,
            },
          }
        )

        dispatch(actions.asyncUpdateFavorites(token))
        dispatch(actions.updateProfile(data.author))
      } catch (error) {
        console.log(JSON.stringify(error))
        dispatch(
          actions.updateAlert({
            message: "Algo salió mal, intentalo más tarde",
            severity: "error",
            open: true,
          })
        )
      }
    }
  }

  if (user) {
    if (user._id === story.author._id) {
      return <Favorite className={classes.disabledIcon} />
    } else if (!part.likes.includes(user._id)) {
      return (
        <FavoriteBorderOutlined
          className={clsx(classes.disabledIcon, classes.cursorPointer)}
          onClick={addOrRemoveLike("add")}
        />
      )
    }
    return (
      <Favorite
        onClick={addOrRemoveLike("remove")}
        className={clsx(classes.liked, classes.cursorPointer)}
      />
    )
  }
  return (
    <>
      <ModalLogin open={openModalLogin} handleClose={handleCloseModalLogin} />
      <FavoriteBorderOutlined onClick={handleOpenModalLogin} className={classes.cursorPointer} />
    </>
  )
}
