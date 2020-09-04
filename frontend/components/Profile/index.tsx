import { useSelector } from "../../Hooks"

export default function Profile(): React.ReactElement {
  const { profile } = useSelector(state => state.app)
  if (profile) {
    return (
      <>
        <h1>Perfil</h1>
        <h2>Bienvenido a {profile.username}</h2>
      </>
    )
  }
  return <h1>Profile not found</h1>
}
