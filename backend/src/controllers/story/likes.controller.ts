// Types
import { Request, Response } from "express"
// Models
import User from "../../models/User.model"
import Story from "../../models/Story.model"
// Helpers
import { Points } from "../../helpers/points.helpers"

/**
 * Route: like/add/:storyId/:storyPartIndex
 *
 * Complete Route: /api/story/part/like/add/:storyId/:storyPartIndex
 *
 * Method: PUT
 *
 * Action: Add like to story.parts:$storyPartIndex.likes
 *
 * Auth required: Yes
 *
 */
export const addLike = async (req: Request, res: Response) => {
  if (req.user) {
    try {
      const userId = req.user.id
      const { storyId, storyPartIndex } = req.params
      /* Add userId to story.parts.$storyPartIndex.likes
       * Inc totalLikes and totalRankPoints by 1
       * Add view to story
       */
      const story = await Story.findOneAndUpdate(
        { _id: storyId },
        {
          $push: {
            [`parts.${storyPartIndex}.likes`]: userId,
            views: userId,
          },
          $inc: { totalLikes: 1, totalRankPoints: 1 },
        },
        { new: true }
      )
      if (story) {
        // Add 1 like to author likes and points
        const author = await User.findByIdAndUpdate(story.author, {
          $inc: { likes: 1, points: Points.STORY_PART_LIKE },
        })
        // Add story to user's favorites stories
        await User.findByIdAndUpdate(userId, {
          $set: { favorites: story._id },
        })
        // Populate story
        await story.populateAuthor()
        // Only get the first parts BUT not update in database
        story.parts = [story.parts[0]]
        return res.status(200).json({ author, story })
      }
    } catch (e) {
      res.status(400).json({ message: "Something wrong" })
    }
  }
  return res.status(401).json({ message: "Not authorized" })
}

/**
 * Route: like/remove/:storyId/:storyPartIndex
 *
 * Complete Route: /api/story/part/like/remove/:storyId/:storyPartIndex
 *
 * Method: PUT
 *
 * Action: Remove like to story.parts:$storyPartIndex.likes
 *
 * Auth required: Yes
 *
 */
export const removeLike = async (req: Request, res: Response) => {
  if (req.user) {
    try {
      const userId = req.user.id
      const { storyId, storyPartIndex } = req.params
      // Remove userId to story.parts.$storyPartIndex.likes
      const story = await Story.findByIdAndUpdate(
        { _id: storyId },
        {
          $pull: {
            [`parts.${storyPartIndex}.likes`]: userId,
          },
          $inc: { totalLikes: -1, totalRankPoints: -1 },
        },
        { new: true }
      )
      if (story) {
        // Remove 1 like to author likes and points
        const author = await User.findByIdAndUpdate(story.author, {
          $inc: { likes: -1, points: -Points.STORY_PART_LIKE },
        })
        // Remove storyId to user's favorites stories
        await User.findByIdAndUpdate(userId, {
          $pull: { favorites: story._id },
        })
        // Populate author
        await story.populateAuthor()
        story.parts = [story.parts[0]]
        return res.json({ author, story })
      }
    } catch (e) {
      res.status(400).json({ message: "Something wrong" })
    }
  }
  return res.status(401).json({ message: "Not authorized" })
}
