import axios from "axios"
const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export const usernameRegex = /^[A-Za-z0-9_]{2,15}$/

export const nameValidation = (
  fieldName: string,
  fieldValue: ValidationReturn
): ValidationReturn => {
  if (fieldValue) {
    if (fieldValue.trim() === "") {
      return `Su ${fieldName} es requerido`
    }
    if (/[^a-zA-Z -áéíóú]/.test(fieldValue)) {
      return "Caracteres invalidos"
    }
    if (fieldValue.trim().length < 3) {
      return `Su ${fieldName} necesita al menos tres caracteres`
    }
    return null
  }
  return `Debe ingresar su ${fieldName}`
}

export const usernameValidation = async (username: ValidationReturn): Promise<ValidationReturn> => {
  if (username) {
    if (username.trim() === "") {
      return "Su nombre de usuario es requerido"
    }
    if (!usernameRegex.test(username)) {
      return "Sólo puede contenter letras, números y guion bajo"
    }
    if (username.trim().length < 3) {
      return "Su nombre de usuario necesita al menos tres caracteres"
    }
    try {
      await axios.post("/api/auth/verify/username", { username })
      return null
    } catch ({ response }) {
      const {
        data: { message },
      } = response
      return message
    }
  }
  return "Debe ingresar un nombre de usuario"
}

export const ageValidation = (age: number | null): ValidationReturn => {
  if (!age) {
    return "La edad es requerida"
  }
  if (age < 18) {
    return "Debes ser mayor de 18 años para registrarte"
  }
  if (age > 99) {
    return "La edad debe ser menor a 99"
  }
  return null
}

export const emailValidation = async (email: ValidationReturn): Promise<ValidationReturn> => {
  if (email) {
    if (email.trim() === "") {
      return "El correo electrónico es requerido"
    } else {
      if (emailRegex.test(email)) {
        try {
          await axios.post("/api/auth/verify/email", { email })
          return null
        } catch ({ response }) {
          const {
            data: { message },
          } = response
          return message
        }
      }
      return "Por favor ingrese un correcto electrónico válido"
    }
  }
  return "Debe ingresar un correo electrónico"
}

export const passwordValidation = (password: ValidationReturn): ValidationReturn => {
  if (password) {
    if (password.length < 5) {
      return "La contraseña debe tener 5 caracteres mínimo"
    }
    return null
  }
  return "Debe ingresar una contraseña"
}

export const termsValidation = (value: boolean | undefined): ValidationReturn => {
  if (!value) {
    return "Debes aceptar para continuar"
  }
  return null
}

export const genderValidation = (gender: ValidationReturn): ValidationReturn => {
  if (!gender) {
    return "Se debe especificar su sexo"
  }
  return null
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const hasError = (errors: any): boolean => {
  for (const field in errors) {
    if (errors[field] !== null) {
      return true
    }
  }
  return false
}
