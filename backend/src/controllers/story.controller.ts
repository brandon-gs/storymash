import { Request, Response } from "express"
import Story from "../models/Story.model"
import User from "../models/User.model"
import StoryPart from "../models/StoryPart.model"
import imageUpload from "../helpers/image.upload.helper"
import { getCommentsFromStoryParts, getLikesFromStory } from "../helpers/story.controller.helper"
import { Points } from "../helpers/points.heleprs"

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
      const { _id: idAuthor } = req.user
      const { title, category } = req.body.story
      const { content } = req.body.part

      // Create story
      const story = await new Story({
        author: idAuthor,
        title,
        category,
        lastPartCreatedAt: new Date(),
      }).save()

      // Create storypart
      const storyPart = await new StoryPart({
        author: idAuthor,
        story: story._id,
        content,
      }).save()

      // Add storypart id to story.parts
      await story.updateOne({ $push: { parts: storyPart._id } })

      // Add story to user stories and add points
      const user = (
        await User.findByIdAndUpdate(
          idAuthor,
          {
            $push: { stories: story._id },
            $inc: { points: Points.CREATE_STORY },
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
    return res.status(400).json({ message: "Error to get story" })
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
      const { _id } = req.user
      const { id } = req.params // Id story
      // Delete story by id
      const story = await Story.findByIdAndDelete(id)
      // Remove story from all users that have it as favorite
      await User.updateMany(
        { "favorites.story": id },
        {
          $pull: {
            favorites: { story: id },
          },
        }
      )
      if (story) {
        await story.populateParts()
        // Delete storyParts
        const parts = story.parts

        // Remove likes, comments, points from the author
        const storyLikes = getLikesFromStory(parts)
        const storyComments = getCommentsFromStoryParts(parts)
        const storyLikesPoints = storyLikes * Points.STORY_PART_LIKE
        const author = await User.findByIdAndUpdate(
          _id,
          {
            $inc: {
              likes: -storyLikes,
              comments: -storyComments,
              points: -(Points.CREATE_STORY + storyLikesPoints),
            },
            $pull: {
              stories: id,
            },
          },
          { new: true }
        )

        // Delete storyParts
        await StoryPart.deleteMany({
          story: story._id,
        })

        // Return stories
        return res.status(200).json({ user: author, message: "Story deleted" })
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

/**
 * Route: view/add/:id
 *
 * Complete Route: /api/story/view/add/:id
 *
 * Method: PUT
 *
 * Action: Add user's id to story's array views
 *
 */
export const addStoryView = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const storyId = req.params.id
      const story = await Story.findByIdAndUpdate(
        storyId,
        {
          $addToSet: { views: req.user.id },
        },
        { new: true }
      )
      return res.status(200).json({ story, message: "Successfully added a view to the story" })
    } catch (e) {
      return res
        .status(400)
        .json({ error: JSON.stringify(e), message: "Error to add view to the story" })
    }
  }
  return res.status(401).json({ message: "Not authorized" })
}

/**
 * Route: /random
 *
 * Complete Route: /api/story/random
 *
 * Method: GET
 *
 * Action: Get a random story
 *
 * Auth required: No
 *
 */
export const getRandomStory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const options = req.query
    const storiesPageData = await Story.paginate(
      {},
      { ...options, sort: { lastPartCreatedAt: -1 }, populate: [populateAuthor, populateParts] }
    )
    if (storiesPageData) {
      return res.status(200).json(storiesPageData)
    }
    return res.status(400).json({ message: "Error to get Random Story" })
  } catch (e) {
    return res.status(400).json({ message: "Catch Error to get Random Story" })
  }
}
