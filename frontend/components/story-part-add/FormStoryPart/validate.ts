export default function validateStoryForm(data: { content: string }): string | null {
  const maxLength = 1500
  const minLength = 10
  const { content } = data
  if (content.length < minLength) {
    return "El contenido debe tener mas de 10 caracteres"
  } else if (content.length > maxLength) {
    return `El contenido no puede ser mayor a ${maxLength} caracteres`
  }
  return null
}
