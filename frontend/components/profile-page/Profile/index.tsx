import { NotFound } from "components/"
import { useSelector } from "react-redux"
import ProfileInfo from "./ProfileInfo"

export default function Profile(): React.ReactElement {
  const { profile } = useSelector(state => state.app)
  if (profile) {
    return (
      <>
        <ProfileInfo />
      </>
    )
  }
  return <NotFound />
}
