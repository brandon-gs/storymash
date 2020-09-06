export function getColorFromLevel(level: number): string {
  const colors = [
    "#ffb7c5",
    "#ff8fa7",
    "#eeaba2",
    "#080505",
    "#b5c6da",
    "#8ea7c6",
    "#7ac4e1",
    "#fff292",
    "#ffec5f",
    "#cee883",
    "#b4dd41",
    "#f781a4",
  ]
  return colors[level]
}

export function getErrorMessage(errorType: string): string {
  switch (errorType) {
    case "unsupportedFileType":
      return "Tipo de archivo no soportado, intente con otra archivo."
    case "maxSizeExceeded":
      return "La imágen no puede tener un tamaño mayor a 2mb."
    default:
      return "Error al subir la imágen intentelo más tarde."
  }
}
