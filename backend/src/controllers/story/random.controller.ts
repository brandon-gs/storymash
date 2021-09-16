// Types
import { Request, Response } from "express"
// Models
import Story from "../../models/Story.model"
// Populate default
import { populateAuthor } from "./stories.controller"

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
      {
        ...options,
        select: { parts: { $slice: 1 } },
        sort: { lastPartCreatedAt: -1 },
        populate: [populateAuthor],
      }
    )
    if (storiesPageData) {
      return res.status(200).json(storiesPageData)
    }
    return res.status(400).json({ message: "Error to get Random Story" })
  } catch (e) {
    return res.status(400).json({ message: "Catch Error to get Random Story" })
  }
}
