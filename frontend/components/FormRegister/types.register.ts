import { ValidationReturn } from "../../utils/formValidations"

export interface RegisterForm {
  firstName: ValidationReturn
  lastName: ValidationReturn
  username: ValidationReturn
  email: ValidationReturn
  age: number | null
  gender: ValidationReturn
  password: ValidationReturn
  terms: boolean | undefined
  showPassword?: boolean | null
}

export type RegisterFormErrors = {
  firstName: ValidationReturn
  lastName: ValidationReturn
  username: ValidationReturn
  age: ValidationReturn
  password: ValidationReturn
  terms: ValidationReturn
  email: ValidationReturn
  gender: ValidationReturn
  hasError?: boolean
}
