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
      const { username } = profile
      dispatch(actions.followUser("unfollow", username, token))
    }
    dispatch(actions.updateLoader(false))
  }

  const followUser = async () => {
    dispatch(actions.updateLoader(true))
    if (profile && user) {
      const { username } = profile
      dispatch(actions.followUser("follow", username, token))
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
