import axios from "axios"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export default function useAxios() {
  const { token } = useSelector(state => state.authentication)

  useEffect(() => {
    axios.interceptors.request.use(config => {
      config.headers.authorization = token
      return config
    })
  }, [token])

  return axios
}
