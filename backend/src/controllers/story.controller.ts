import { Request, Response } from "express"
import Story from "../models/Story.model"
import User from "../models/User.model"
import StoryPart from "../models/StoryPart.model"
import imageUpload from "../helpers/image.upload.helper"

export const createStoryController = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { _id, stories } = req.user
      const { title, category } = req.body.story
      const { content } = req.body.part

      const story = await new Story({
        author: _id,
        title,
        category,
      }).save()

      const { imageName, message } = await imageUpload(req, "story", story._id)
      if (imageName) {
        story.image = imageName
      }
      const storyPart = await new StoryPart({
        author: _id,
        story: story._id,
        content,
      }).save()

      story.parts = [storyPart._id]
      await story.save()

      const user = (
        await User.findByIdAndUpdate(
          _id,
          {
            stories: [...stories, _id],
          },
          { new: true }
        )
      )?.getPublicData()
      return res.status(200).json({ story, user, message })
    } catch (error) {
      return res.status(400).json({ message: "Error to create story" })
    }
  }
  return res.status(401).json({ message: "Unauthorized" })
}

export const getStoryController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params
    const story = await Story.findById(id)
    if (story) {
      await story.populateAuthor()
      await story.populateParts()
      return res.status(200).json({ story, message: "Story found" })
    }
    return res.status(404).json({ message: "Story dont found" })
  } catch (error) {
    return res.status(404).json({ message: "Error to get story" })
  }
}

export const getStoriesByUsername = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username } = req.params
    const user = await User.findOne({ username }).select("_id")
    if (user) {
      const stories = await Story.find({ author: user._id })
      if (stories) {
        for (let i = 0; i < stories.length; i++) {
          await stories[i].populateAuthor()
          await stories[i].populateParts()
        }
        return res.status(200).json({ stories })
      }
      return res.status(404).json({ message: "User hasn't stories" })
    }
    return res.status(404).json({ message: "User dont found" })
  } catch (error) {
    return res.status(404).json({ message: "Stories dont found" })
  }
}

export const updateStory = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { id } = req.params
      const story = await Story.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      })
      await story?.populateAuthor()
      await story?.populateParts()
      return res.status(200).json({ story, message: "Story updated" })
    } catch (e) {
      return res.status(404).json({ message: "Story to update not found or error to update" })
    }
  }
  return res.status(400).json({ message: "Error not user" })
}

export const deleteStory = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { _id } = req.user
      const { id } = req.params
      await Story.findOneAndDelete({ _id: id })
      const newStories = req.user.stories.filter(idStory => idStory !== id)
      await User.findByIdAndUpdate(_id, { stories: newStories })
      return res.status(200).json({ message: "Story deleted" })
    } catch (e) {
      return res.status(404).json({ message: "Stories do not found" })
    }
  }
  return res.status(400).json({ message: "Error not user" })
}
