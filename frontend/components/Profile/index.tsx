import { useSelector } from "../../Hooks"
import ProfileInfo from "./ProfileInfo"
import ProfileAbout from "./ProfileAbout"

export default function Profile(): React.ReactElement {
  const { profile } = useSelector(state => state.app)
  if (profile) {
    return (
      <>
        <ProfileInfo></ProfileInfo>
        <ProfileAbout></ProfileAbout>
      </>
    )
  }
  return <h1>Profile not found</h1>
}
