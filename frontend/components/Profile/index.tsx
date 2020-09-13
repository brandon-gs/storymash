import { useSelector } from "../../Hooks"
import ProfileInfo from "./ProfileInfo"

export default function Profile(): React.ReactElement {
  const { profile } = useSelector(state => state.app)
  if (profile) {
    return (
      <>
        <ProfileInfo></ProfileInfo>
      </>
    )
  }
  return <h1>Profile not found</h1>
}
