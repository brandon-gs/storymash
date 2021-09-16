// Types
import { Request, Response } from "express"
// Models
import Story from "../../models/Story.model"

/**
 * Route: view/add/:id
 *
 * Complete Route: /api/story/view/add/:id
 *
 * Method: PUT
 *
 * Action: Add user's id to story's array views
 *
 * Auth required: Yes (Required because we need add user's id to story.views)
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
          $inc: { totalRankPoints: 0.1 },
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
