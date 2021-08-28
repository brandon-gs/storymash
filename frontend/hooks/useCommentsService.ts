import { useDispatch } from "react-redux"
import actions from "store/actions"
import useAxios from "./useAxios"

const BASE_URI = "/api/comment"

/**
 *
 * @param storyPartId Story chapter id where requests will be made
 * @param index index of story part
 * @returns
 */
export default function useCommentsService(storyPartId: string = "", indexStoryPart: number) {
  // Constants
  const CREATE_READ_URI = `${BASE_URI}/part/${storyPartId}`

  // Hooks
  const axios = useAxios()
  const dispatch = useDispatch()

  const sendComment = async (content: string, fn?: () => void) => {
    try {
      const { data } = await axios.post(CREATE_READ_URI, { content })
      dispatch(actions.addCommentToStorPart(indexStoryPart, data.comment))
      dispatch(
        actions.updateAlert({
          open: true,
          message: "¡Comentario publicado!",
          severity: "success",
        })
      )
    } catch (e) {
      dispatch(
        actions.updateAlert({
          open: true,
          message: "Error al crear el comentario, intentelo más tarde",
          severity: "error",
        })
      )
    }
    fn && fn()
  }

  const editComment = async (idComment: string, content: string, fn?: () => void) => {
    try {
      const { data } = await axios.put(`${BASE_URI}/${idComment}`, { content })
      dispatch(actions.updateComment(indexStoryPart, data.comment))
      dispatch(
        actions.updateAlert({
          open: true,
          message: "¡Comentario editado!",
          severity: "success",
        })
      )
    } catch (e) {
      dispatch(
        actions.updateAlert({
          open: true,
          message: "Error al editar el comentario, intentelo más tarde",
          severity: "error",
        })
      )
    }
    fn && fn()
  }

  const deleteComment = async (idComment: string, fn?: () => void) => {
    try {
      const { data } = await axios.delete(`${BASE_URI}/${idComment}`)
      dispatch(actions.deleteComment(indexStoryPart, idComment))
      dispatch(
        actions.updateAlert({
          open: true,
          message: "¡Comentario eliminado!",
          severity: "success",
        })
      )
    } catch (e) {
      dispatch(
        actions.updateAlert({
          open: true,
          message: "Error al eliminar el comentario, intentelo más tarde",
          severity: "error",
        })
      )
    }
    fn && fn()
  }

  return { sendComment, editComment, deleteComment }
}
