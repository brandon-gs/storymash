import { Request, Response } from "express"
import Story from "../models/Story.model"
import User from "../models/User.model"
import StoryPart from "../models/StoryPart.model"
import imageUpload from "../helpers/image.upload.helper"
import { getLikesFromStory } from "../helpers/story.controller.helper"

const populateAuthor = {
  path: "author",
  select: { username: 1, image: 1 },
}

const populateParts = {
  path: "parts",
  populate: {
    path: "comments",
    populate: { path: "author", select: { username: 1, image: 1 } },
  },
}

export const createStory = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { _id, stories } = req.user
      const { title, category } = req.body.story
      const { content } = req.body.part

      const story = await new Story({
        author: _id,
        title,
        category,
        lastPartCreatedAt: new Date(),
      }).save()

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
      return res.status(200).json({ story, user, message: "Content story saved" })
    } catch (error) {
      return res.status(400).json({ message: "Error to create story" })
    }
  }
  return res.status(401).json({ message: "Unauthorized" })
}

export const uploadStoryImage = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    if (!req.file) {
      return res.status(400).json({ message: "Not image provided" })
    }
    const { id } = req.params
    const story = await Story.findById(id)
    if (story) {
      const { imageName, message } = await imageUpload(req)
      if (imageName) {
        story.image = imageName
        await story.save()
        return res.status(200).json({ story, message })
      }
    }
    return res.status(404).json({ message: "Story dont found" })
  }
  return res.status(401).json({ message: "Unauthorized" })
}

export const getStory = async (req: Request, res: Response): Promise<Response> => {
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
    const { query } = req
    const { username } = req.params
    const author = await User.findOne({ username }).select("_id")
    if (author) {
      const storiesPageData = await Story.paginate(
        { author: author._id },
        {
          ...query,
          sort: { lastPartCreatedAt: -1 },
          populate: [populateParts, populateAuthor],
        }
      )
      if (storiesPageData) {
        return res.status(200).json(storiesPageData)
      }
      return res.status(404).json({ message: "Error to get Stories by username" })
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
      const { _id, stories, likes } = req.user
      const { id } = req.params
      const story = await Story.findByIdAndDelete(id)
      if (story) {
        await story.populateParts()
        const parts = story.parts
        const storyLikes = getLikesFromStory(parts)
        const indexOfStory = stories.indexOf(id)
        const newStories = stories.slice(0)
        newStories.splice(indexOfStory, 1)
        const newLikes = likes - storyLikes
        const user = await User.findByIdAndUpdate(
          _id,
          { stories: newStories, likes: newLikes },
          { new: true }
        )
        return res.status(200).json({ user, stories: newStories, message: "Story deleted" })
      }
      return res.status(404).json({ message: "Story do not found" })
    } catch (e) {
      return res.status(404).json({ message: "Story do not found" })
    }
  }
  return res.status(400).json({ message: "Error not user" })
}

export const getFavoritesStories = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { favorites } = await User.findById(req.user._id)
        .populate({
          path: "favorites",
          populate: {
            path: "story",
            populate: [populateAuthor, populateParts],
          },
        })
        .select("favorites")
      if (favorites) {
        return res.status(200).json({ favorites: favorites.reverse() })
      }
      return res.status(200).json({ favorites: [], message: "user hasn't favorites" })
    } catch (e) {
      return res.status(404).json({ favorites: [], message: "Error to get favorites" })
    }
  }
  return res.status(400).json({ message: "Error not user" })
}

export const getAllStories = async (req: Request, res: Response): Promise<Response> => {
  try {
    const options = req.query
    const storiesPageData = await Story.paginate(
      {},
      { ...options, sort: { lastPartCreatedAt: -1 }, populate: [populateAuthor, populateParts] }
    )
    if (storiesPageData) {
      return res.status(200).json(storiesPageData)
    }
    return res.status(400).json({ message: "Error to get All Stories" })
  } catch (e) {
    return res.status(400).json({ message: "Catch Error to get All Story" })
  }
}
