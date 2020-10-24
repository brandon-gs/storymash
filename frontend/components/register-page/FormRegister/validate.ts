/*
  Values : object
  ------ Props ------
  * firstName
  * lastName
  * age
  * gender
  * email
  * password
  * terms
*/
import {
  nameValidation,
  passwordValidation,
  ageValidation,
  termsValidation,
  emailValidation,
  genderValidation,
  hasError,
  usernameValidation,
} from "../../../utils/formValidations"

export default async function validateForm(values: RegisterForm): Promise<RegisterFormErrors> {
  const { firstName, lastName, age, gender, email, password, terms, username } = values
  const errors: RegisterFormErrors = {
    firstName: nameValidation("nombre", firstName),
    lastName: nameValidation("apellido", lastName),
    username: await usernameValidation(username),
    age: ageValidation(age),
    password: passwordValidation(password),
    terms: termsValidation(terms),
    email: await emailValidation(email),
    gender: genderValidation(gender),
  }
  errors.hasError = hasError(errors)
  return errors
}
