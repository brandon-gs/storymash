import { useDispatch } from "react-redux"
import actions from "store/actions"
import axios from "axios"

const BASE_URI = "/api/story/comment"

/**
 *
 * @param storyPartId Story chapter id where requests will be made
 * @param index index of story part
 * @returns
 */
export default function useCommentsService(storyId: string, indexStoryPart: number) {
  // Constants
  const CREATE_READ_URI = `${BASE_URI}/${storyId}/${indexStoryPart}`

  // Hooks
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
    if (fn) fn()
  }

  const editComment = async (commentIndex: number, content: string, fn?: () => void) => {
    try {
      const { data } = await axios.put(`${CREATE_READ_URI}/${commentIndex}`, { content })
      dispatch(actions.updateComment(indexStoryPart, commentIndex, data.comment))
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
    if (fn) fn()
  }

  const deleteComment = async (commentIndex: number, fn?: () => void) => {
    try {
      await axios.delete(`${BASE_URI}/${commentIndex}`)
      dispatch(actions.deleteComment(indexStoryPart, commentIndex))
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
    if (fn) fn()
  }

  return { sendComment, editComment, deleteComment }
}
