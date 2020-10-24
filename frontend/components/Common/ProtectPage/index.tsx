// Types
import { ReactNode } from "react"
// Components
import { Backdrop, CircularProgress } from "@material-ui/core"
// Hooks
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import useStyles from "./style"

type Props = {
  type: "both" | "public" | "private"
  children: ReactNode
}

export default function ProtectPage({ type, children }: Props) {
  const { auth } = useSelector(state => state.authentication)
  const router = useRouter()
  const classes = useStyles()
  const allowRenderPage =
    type === "both" || (!auth && type === "public") || (auth && type === "private")
  if (allowRenderPage) {
    return <>{children}</>
  }
  const route = type === "private" && !auth ? "/login" : type === "public" && auth ? "/" : null
  if (route) {
    router.push(route)
  }
  return (
    <div>
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}
