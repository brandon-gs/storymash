import { RegisterForm, RegisterFormErrors } from "./types.register"

const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)

export const ages = range(18, 99, 1)

export function normalizeName(word: string | null): string | null {
  if (word) return word.length > 0 ? word[0].toUpperCase() + word.slice(1) : ""
  return word
}

export function normalizeValues(values: RegisterForm, prop: string, value: string): RegisterForm {
  if (prop === "firstName" || prop === "lastName") {
    if (!/\d/g.test(value) || value === "") {
      return { ...values, [prop]: normalizeName(value) }
    }
    return values
  } else if (prop === "username") {
    if (!/[\Wáéíóú]/g.test(value) || value === "") {
      return { ...values, [prop]: value }
    }
    return values
  }
  return { ...values, [prop]: value }
}

export const registerFormInitialValues: RegisterForm = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  email: "",
  age: 0,
  gender: "",
  terms: false,
  showPassword: false,
}

export const registerFormInitialErrors: RegisterFormErrors = {
  firstName: null,
  lastName: null,
  username: null,
  password: null,
  email: null,
  terms: null,
  age: null,
  gender: null,
}
