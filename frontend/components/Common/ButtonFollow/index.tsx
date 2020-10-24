// Components
import { Button, ButtonProps } from "@material-ui/core"
import { ModalLogin } from "../../index"
// Icons
import { Remove, PersonAdd } from "@material-ui/icons"
// Hooks
import { useState } from "react"
import useStyles from "./styles"
import { useSelector, useDispatch } from "react-redux"
import actions from "../../../store/actions"
// Helpers
import clsx from "clsx"

export default function ButtonFollow(props: ButtonProps): JSX.Element {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    app: { profile },
    authentication: { user, token },
  } = useSelector(state => state)
  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false)
  const isFollower = user ? profile?.followers.includes(user._id) : false

  const handleCloseModalLogin = () => {
    setOpenModalLogin(false)
  }

  const handleOpenModalLogin = () => {
    setOpenModalLogin(true)
  }

  const unfollowUser = async () => {
    dispatch(actions.updateLoader(true))
    if (profile && user) {
      const { followers, username } = profile
      const { following } = user
      const indexOfFollowerUser = followers.indexOf(user._id)
      const indexOfFollwingUser = following.indexOf(profile._id)
      followers.splice(indexOfFollowerUser, 1)
      following.splice(indexOfFollwingUser, 1)

      dispatch(actions.asyncUpdateUser(token, { following }))
      dispatch(actions.asyncUpdateProfile(username, { followers }, token))
    }
    dispatch(actions.updateLoader(false))
  }

  const followUser = async () => {
    dispatch(actions.updateLoader(true))
    if (profile && user) {
      const { followers, username } = profile
      const { following } = user
      followers.push(user._id)
      following.push(profile._id)
      dispatch(actions.asyncUpdateUser(token, { following }))
      dispatch(actions.asyncUpdateProfile(username, { followers }, token))
    }
    dispatch(actions.updateLoader(false))
  }

  if (user) {
    if (profile?.username !== user.username) {
      return (
        <>
          {!isFollower ? (
            <Button
              variant="contained"
              className={classes.button}
              onClick={followUser}
              startIcon={<PersonAdd />}
              color="primary"
              {...props}
            >
              Seguir
            </Button>
          ) : (
            <Button
              variant="contained"
              className={clsx(classes.button, classes.buttonUnfollow)}
              onClick={unfollowUser}
              startIcon={<Remove />}
              {...props}
            >
              Dejar de seguir
            </Button>
          )}
        </>
      )
    }
  }
  return (
    <>
      <ModalLogin open={openModalLogin} handleClose={handleCloseModalLogin} />
      <Button
        variant="contained"
        className={classes.button}
        onClick={handleOpenModalLogin}
        startIcon={<PersonAdd />}
        color="primary"
        {...props}
      >
        Seguir
      </Button>
    </>
  )
}
