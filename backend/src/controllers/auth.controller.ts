import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import User from "../models/User.model"

function createToken(user?: Express.User) {
  return jwt.sign({ _id: user?._id }, process.env.JWT_SECRET || "CUSTOM_JWT_SECRET")
}

export const loginController = (req: Request, res: Response): Response => {
  const { user } = req
  const token = createToken(user)
  return res.status(200).json({ token, user: user?.getPublicData() })
}

export const registerController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { firstName, lastName, username, age, gender, email, password } = req.body
    if (!email || !password) {
      return res.status(500).json({
        message: "El correo electronico y la contraseña deben ser proporcionados",
      })
    }
    let user = await User.findOne({ email })
    if (user) {
      return res.status(422).json({ message: "Correo electrónico en uso" })
    }
    user = await User.findOne({ username })
    if (user) {
      return res.status(422).json({ message: "Nombre de usuario en uso" })
    }
    const newUser = new User({
      firstName,
      lastName,
      username,
      age,
      gender,
      email,
      password,
    })
    const publicUser = (await newUser.save()).getPublicData()
    return res.status(200).json({ token: createToken(newUser), user: publicUser })
  } catch (error) {
    return res.status(200).json({ message: "Error to create user" })
  }
}

export const verifyUsername = async (req: Request, res: Response): Promise<Response> => {
  const { username } = req.body
  const user = await User.findOne({ username })
  if (user) {
    return res.status(422).json({
      message: "Ya se ha registrado este nombre de usuario",
    })
  }
  return res.status(200).json({
    message: "Nombre de usuario aceptado",
  })
}

export const verifyEmail = async (req: Request, res: Response): Promise<Response> => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (user) {
    return res.status(422).json({
      message: "Ya se ha registrado este correo electrónico",
    })
  }
  return res.status(200).json({
    message: "El correo no ha sido registrado",
  })
}
