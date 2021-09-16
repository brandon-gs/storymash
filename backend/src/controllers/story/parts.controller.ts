// Types
import { Request, Response } from "express"
import { IStoryPart } from "../../models/types/Story.types"
// Models
import User from "../../models/User.model"
import Story from "../../models/Story.model"
// Helpers
import { Points } from "../../helpers/points.helpers"
import { populateAuthor } from "./stories.controller"

/**
 * Route: /:storyId
 *
 * Complete Route: /api/story/part/:storyId
 *
 * Method: POST
 *
 * Action: Add a story part to story.parts searching it by :storyId param
 *
 * Auth required: Yes
 *
 */
export const createStoryPart = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { storyId } = req.params // Story id
      const { _id } = req.user
      const { content } = req.body
      // Create new story part
      const newStoryPart: IStoryPart = {
        content,
        comments: [],
        likes: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      // Add new story part to story.parts
      const story = await Story.findOneAndUpdate(
        { _id: storyId },
        {
          $push: {
            parts: newStoryPart,
          },
          lastPartCreatedAt: new Date(),
        },
        { new: true }
      )
      if (story) {
        // Add points to user
        const user = await User.findByIdAndUpdate(
          { _id },
          {
            $inc: {
              points: Points.CREATE_STORY_PART,
            },
          },
          { new: true }
        )
        return res.status(200).json({ user, message: "Parte creada" })
      }
      return res.status(400).json({ message: "Story dont found" })
    } catch (error) {
      return res.status(403).json({ message: "Story part dont was created" })
    }
  }
  return res.status(401).json({ message: "Story part dont was created" })
}

/**
 * Route: /:storyId/:storyPartIndex
 *
 * Complete Route: /api/story/part/:storyId/:storyPartIndex
 *
 * Method: PUT
 *
 * Action: Update a story part this modified story.parts:$storyPartIndex
 *
 * Auth required: Yes
 *
 */
export const updateStoryPart = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { content } = req.body
      const { storyId, storyPartIndex } = req.params
      // Update story part from story.parts
      const story = await Story.findOneAndUpdate(
        { _id: storyId },
        {
          [`parts.${storyPartIndex}.content`]: content,
        },
        { new: true }
      )
      return res.status(200).json({ story, message: "Parte de la historia actualizada" })
    } catch (e) {
      return res.status(404).json({ message: "Story part do not found" })
    }
  }
  return res.status(401).json({ message: "Not authorized" })
}

/**
 * Route: /:storyId/:storyPartIndex
 *
 * Complete Route: /api/story/part/:storyId/:storyPartIndex
 *
 * Method: DELETE
 *
 * Action: Update a story part this modified story.parts:$storyPartIndex
 *
 * Auth required: Yes
 *
 */
export const deleteStoryPart = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { storyId, storyPartIndex } = req.params
      const story = await Story.findOne({
        _id: storyId,
      }).populate(populateAuthor)
      if (story) {
        // Get deleted storyPart
        const storyPart = story.parts[storyPartIndex]
        // Sub likes from story part to author
        const likePoints = storyPart.likes.length * Points.STORY_PART_LIKE
        await User.findByIdAndUpdate(storyPart.author, {
          $inc: {
            likes: -storyPart.likes.length,
            points: -(likePoints + Points.CREATE_STORY_PART),
          },
        })
        // Delete story part from story.parts
        story.parts.splice(parseInt(storyPartIndex), 1)
        await story.save()
        // Add points to user
        return res.status(200).json({ story, message: "Parte de la historia eliminada" })
      }
      return res.status(404).json({ message: "Story not found" })
    } catch (e) {
      return res.status(404).json({ message: "Error to delete story part" })
    }
  }
  return res.status(401).json({ message: "Not authorized" })
}
