import { Request, Response } from "express"
import User from "../models/User.model"

export function getUserFromToken(req: Request, res: Response): Response {
  if (req.user) {
    return res.status(200).json({ user: req.user })
  }
  return res.status(404).json({ message: "Not authorized" })
}

export async function getUserFromUsername(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const username = req.params
    const user = (await User.findOne({ username }))?.getPublicData()
    return res.status(200).json({ user })
  } catch (error) {
    return res.status(400).json({ message: "Error to get user from username" })
  }
}
