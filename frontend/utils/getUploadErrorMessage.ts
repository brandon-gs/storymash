export default function getErrorMessage(errorType: string): string {
  switch (errorType) {
    case "unsupportedFileType":
      return "Tipo de archivo no soportado, intente con otra archivo."
    case "maxSizeExceeded":
      return "La imágen no puede tener un tamaño mayor a 2mb."
    default:
      return "Error al subir la imágen intentelo más tarde."
  }
}
