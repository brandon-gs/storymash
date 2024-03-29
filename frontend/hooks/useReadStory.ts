import { useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios"

export default function useStoriesServices(id?: string) {
  const { auth } = useSelector(state => state.authentication)

  useEffect(() => {
    const addView = async () => {
      try {
        await axios.put(`/api/story/view/add/${id}`)
      } catch (e) {
        console.error(e)
      }
    }

    if (id && auth) {
      addView()
    }
  }, [id, auth])
}
