import { minLength, maxLength } from "./helpers"

export default function validateStoryForm(data: StoryForm): string | null {
  const { title, content, category } = data
  if (!title) {
    return "La historia debe tener un título"
  } else if (/_/g.test(title)) {
    return "El título no puede tener _"
  } else if (!/[\wáéíóúÁÉÍÓÚ]/g.test(title)) {
    return "El título contiene caracteres inválidos"
  } else if (!content) {
    return "La historia debe tener su contenido"
  } else if (content.length < minLength) {
    return "El contenido debe tener mas de 10 caracteres"
  } else if (content.length > maxLength) {
    return `El contenido no puede ser mayor a ${maxLength} caracteres`
  } else if (!category) {
    return "La historia debe tener una categoría"
  } else if (category.length < 1) {
    return "Se debe seleccionar mínimo una categoria"
  }
  return null
}
