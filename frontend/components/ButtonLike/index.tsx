import clsx from "clsx"
// Icons
import { Favorite, FavoriteBorderOutlined } from "@material-ui/icons"
// Hooks
import { useDispatch } from "react-redux"
import { useSelector } from "../../Hooks"
import useStyles from "./styles"
import actions from "../../store/actions"
import Axios from "axios"
import { useState } from "react"
import { ModalLogin } from ".."

type Props = {
  part: StoryPart
  story: Story
}

// Get icon from depend if a user is creator of history or if he liked the history
export default function LikeIcon({ part, story }: Props): JSX.Element {
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

  const addOrRemoveLike = async () => {
    dispatch(actions.updateLoader(true))
    if (user) {
      try {
        const { data } = await Axios.put(
          `/api/story/part/like/${part._id}`,
          {},
          {
            headers: {
              authorization: token,
            },
          }
        )
        const storyIndex = stories.indexOf(story)
        const newStories = stories.slice(0)
        newStories[storyIndex] = data.story
        dispatch(actions.updateStories(newStories))
        dispatch(actions.updateProfile(data.author))
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    }
    dispatch(actions.updateLoader(false))
  }

  if (user) {
    if (user._id === part.author) {
      return <Favorite className={classes.disabledIcon} />
    } else if (!part.likes.includes(user._id)) {
      return (
        <FavoriteBorderOutlined
          className={clsx(classes.disabledIcon, classes.cursorPointer)}
          onClick={addOrRemoveLike}
        />
      )
    }
    return (
      <Favorite onClick={addOrRemoveLike} className={clsx(classes.liked, classes.cursorPointer)} />
    )
  }
  return (
    <>
      <ModalLogin open={openModalLogin} handleClose={handleCloseModalLogin} />
      <FavoriteBorderOutlined onClick={handleOpenModalLogin} className={classes.cursorPointer} />
    </>
  )
}
