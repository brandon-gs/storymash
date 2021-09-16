// Types
import { Request, Response } from "express"
import { IStoryPart } from "../../models/types/Story.types"
// Models
import Story from "../../models/Story.model"
import User from "../../models/User.model"
// Helpers
import { getCommentsFromStoryParts, getLikesFromStory } from "../../helpers/story.controller.helper"
import { Points } from "../../helpers/points.helpers"

/**
 * Route: /
 *
 * Complete Route: /api/story/
 *
 * Method: POST
 *
 * Action: Create a story, add it to the author.stories and add points to the author
 *
 * Auth required: Yes
 *
 */
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
      const storyPart: IStoryPart = {
        content,
        likes: [],
        comments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      // Add storypart to story.parts
      await story.updateOne({ $push: { parts: storyPart } })

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

/**
 * Route: /:id
 *
 * Complete Route: /api/story/:id
 *
 * Method: GET
 *
 * Action: Get data from a story searching by id
 *
 * Auth required: No
 *
 */
export const getStory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params
    const story = await Story.findById(id)
    if (story) {
      await story.populateAuthor()
      return res.status(200).json({ story, message: "Story found" })
    }
    return res.status(404).json({ message: "Story dont found" })
  } catch (error) {
    return res.status(400).json({ message: "Error to get story" })
  }
}

/**
 * Route: /:id
 *
 * Complete Route: /api/story/:id
 *
 * Method: PUT
 *
 * Action: Update story's data with id as param
 *
 * Auth required: Yes (You must be the author of the story)
 *
 */
export const updateStory = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { id } = req.params
      const story = await Story.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      })
      await story?.populateAuthor()
      return res.status(200).json({ story, message: "Story updated" })
    } catch (e) {
      return res.status(404).json({ message: "Story to update not found or error to update" })
    }
  }
  return res.status(400).json({ message: "Error not user" })
}

/**
 * Route: /:id
 *
 * Complete Route: /api/story/:id
 *
 * Method: DELETE
 *
 * Action: Delete a story with id as param and remove points from the author
 *
 * Auth required: Yes (You must be the author of the story)
 *
 */
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
            favorites: id,
          },
        }
      )

      // Calculate likes, comments, points from the author
      const storyLikes = getLikesFromStory(story.parts)
      const storyComments = getCommentsFromStoryParts(story.parts)
      const storyLikesPoints = storyLikes * Points.STORY_PART_LIKE

      // Decrement points from author
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

      // Return author
      return res.status(200).json({ user: author, message: "Story deleted" })
    } catch (e) {
      return res.status(404).json({ message: "Error to delete story" })
    }
  }
  return res.status(400).json({ message: "Error not user" })
}
