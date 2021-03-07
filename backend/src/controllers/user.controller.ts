import { Request, Response } from "express"
import User from "../models/User.model"
import { hasOnlyPublicFields } from "../helpers/user.controller.helper"
import imageUpload from "../helpers/image.upload.helper"

export function getUserFromToken(req: Request, res: Response): Response {
  if (req.user) {
    return res.status(200).json({ user: req.user.getPublicData() })
  }
  return res.status(404).json({ message: "Not authorized" })
}

export async function getUserFromUsername(req: Request, res: Response): Promise<Response> {
  try {
    const { username } = req.params
    const user = (await User.findOne({ username }))?.getPublicData()
    return res.status(200).json({ user })
  } catch (error) {
    return res.status(400).json({ message: "Error to get user from username" })
  }
}

export const updateUserFromToken = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { _id } = req.user
      const user = (await User.findByIdAndUpdate(_id, req.body, { new: true }))?.getPublicData()
      return res.status(200).json({ user })
    } catch (error) {
      return res.status(404).json({ message: "Error to get user from username" })
    }
  } else {
    return res.status(404).json({ message: "Unauthorized" })
  }
}

export const updateUserFromUsername = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const onlyPublicFields = hasOnlyPublicFields(req)

      if (!onlyPublicFields) {
        return res.status(404).json({ message: "Unauthorized changes" })
      }

      const { username } = req.params
      const user = (
        await User.findOneAndUpdate({ username }, req.body, { new: true })
      )?.getPublicData()
      return res.status(200).json({ user })
    } catch (error) {
      return res.status(404).json({ message: "Error to get user from username or body is null" })
    }
  } else {
    return res.status(404).json({ message: "Unauthorized" })
  }
}

export const updateUserImage = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    if (!req.file) {
      return res.status(400).json({ message: "Not image provided" })
    }
    const { _id } = req.user
    const { imageName, message } = await imageUpload(req)
    if (imageName) {
      const user = (
        await User.findByIdAndUpdate(_id, { image: imageName }, { new: true })
      )?.getPublicData()
      return res.status(200).json({ user, message })
    }
    return res.status(400).json({ message })
  }
  return res.status(400).json({ message: "Not authorized" })
}

export const getAllUsernames = async (req: Request, res: Response): Promise<Response> => {
  try {
    const usernames = await User.find().select("username")
    return res.status(200).json({ usernames })
  } catch (error) {
    return res.status(400).json({ message: "Error to get user from username" })
  }
}
