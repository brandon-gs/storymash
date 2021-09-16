// Types
import { Request, Response } from "express"
// Models
import Story from "../../models/Story.model"
// Populate default
import { populateAuthor } from "./stories.controller"

/**
 * Route: plank/
 *
 * Complete Route: /api/story/plank/
 *
 * Method: GET
 *
 * Action: Get stories from all users that a user follow
 *
 * Auth required: Yes
 *
 */
export const getStoriesPlank = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { following } = req.user
      // Search stories if author is in the following array
      const stories = await Story.find(
        {
          author: { $in: following },
        },
        {
          parts: { $slice: 1 },
        }
      )
        .sort({ lastPartCreatedAt: -1 })
        .populate(populateAuthor)

      return res.status(200).json({ stories, message: "Get stories from users that i follow" })
    } catch (e) {
      return res.status(400).json({ message: "Catch Error to get plank stories" })
    }
  }
  return res.status(401).json({ message: "No authenticated" })
}
