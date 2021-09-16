// Types
import { Request, Response } from "express"
// Models
import Story from "../../models/Story.model"
// Populate default
import { populateAuthor } from "./stories.controller"

/**
 * Route: search/:query
 *
 * Complete Route: /api/story/search/:query
 *
 * Method: GET
 *
 * Action: Get a story filtered by query
 *
 * Auth required: No
 *
 */
export const getStoryBySearch = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { query } = req.params

    // Search stories by title or story.part.content
    const stories = await Story.find({
      $or: [
        {
          title: {
            $regex: new RegExp(query),
            $options: "i",
          },
        },
        {
          "parts.content": {
            $regex: new RegExp(query),
            $options: "i",
          },
        },
      ],
    }).populate(populateAuthor)

    return res.status(200).json({ stories, message: "Get stories by query" })
  } catch (e) {
    return res.status(400).json({ message: "Catch Error to get story by query" })
  }
}
