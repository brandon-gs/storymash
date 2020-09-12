import StoryPart from "../models/StoryPart.model"
import User from "../models/User.model"
import Story from "../models/Story.model"
import { Request, Response } from "express"

export const createStoryPart = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { id } = req.params // Story id
      const { _id } = req.user
      const newStoryPart = new StoryPart(req.body)
      await newStoryPart.save()
      const story = await Story.findById(id)
      if (story) {
        const parts = [...story.parts, newStoryPart._id]
        await Story.findOneAndUpdate({ _id: id }, { parts }, { new: true })
        const user = await User.findById(_id)
        return res.status(200).json({ user, message: "Parte creada" })
      }
      return res.status(400).json({ message: "Story dont found" })
    } catch (error) {
      return res.status(403).json({ message: "Story part dont was created" })
    }
  }
  return res.status(401).json({ message: "Story part dont was created" })
}

export const updateStoryPart = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { id } = req.params
      const { _id } = req.user
      const storyPart = await StoryPart.findOneAndUpdate({ _id: id }, req.body, { new: true })
      const user = await User.findById(_id)
      return res.status(200).json({ user, storyPart, message: "Parte de la historia actualizada" })
    } catch (e) {
      return res.status(404).json({ message: "Story part do not found" })
    }
  }
  return res.status(401).json({ message: "Not authorized" })
}

export const updateLikes = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { id } = req.params // id of story part
      const { _id } = req.user
      const storyPart = await StoryPart.findById(id)
      const author = await User.findById(storyPart?.author)
      const story = await Story.findById(storyPart?.story)
      // Add or remove id user to array likes in story part
      if (storyPart && author) {
        if (storyPart?.likes.includes(_id)) {
          storyPart.likes = storyPart.likes.filter(userid => userid === _id)
          author.likes -= 1
        } else {
          storyPart.likes = [...storyPart.likes, _id]
          author.likes += 1
        }
      }
      // Update views in story
      if (story && !story.views.includes(_id) && storyPart?.author !== _id) {
        story.views = [...story.views, _id]
      }
      await storyPart?.save()
      await story?.save()
      await author?.save()
      await story?.populateAuthor()
      await story?.populateParts()
      return res
        .status(200)
        .json({ story, author, storyPart, message: "Add like to creathor and part story" })
    } catch (e) {
      return res.status(404).json({ message: "Story part do not found or something wrong" })
    }
  }
  return res.status(401).json({ message: "Not authorized" })
}

export const deleteStoryPart = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { id } = req.params
      const { _id } = req.user
      await StoryPart.findOneAndDelete({ _id: id })
      const user = await User.findById(_id)
      return res.status(200).json({ user, message: "Parte de la historia eliminada" })
    } catch (e) {
      return res.status(404).json({ message: "Story part do not found" })
    }
  }
  return res.status(401).json({ message: "Not authorized" })
}
