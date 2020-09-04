import { useSelector } from "../../../Hooks"
import { useRouter } from "next/router"
import { Head } from "../../"

type Props = {
  children: JSX.Element
  location: string
}

export default function WithAuthRedirect({ children, location }: Props): JSX.Element {
  const { auth } = useSelector(state => state.authentication)
  const router = useRouter()
  if (auth) {
    router.push(location)
    return <Head title="Storymash" />
  } else {
    return <>{children}</>
  }
}
