// Types
import { Request, Response } from "express"
// Models
import Story from "../../models/Story.model"
// Populate default
import { populateAuthor } from "./stories.controller"

/**
 * Route: rank/
 *
 * Complete Route: /api/story/rank/
 *
 * Method: GET
 *
 * Action: Get stories ordered by totalRankPoints
 *
 * Auth required: No
 *
 */
export const getStoriesByRank = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Search stories if author is in the following array
    const stories = await Story.paginate(
      {},
      {
        ...req.query,
        sort: {
          totalRankPoints: -1,
        },
        select: { parts: { $slice: 1 } },
        populate: [populateAuthor],
      }
    )

    return res.status(200).json(stories)
  } catch (e) {
    return res.status(400).json({ message: "Catch Error to get plank stories" })
  }
}
