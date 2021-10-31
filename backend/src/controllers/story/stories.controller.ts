// Types
import { Request, Response } from "express"
// Models
import Story from "../../models/Story.model"
import User from "../../models/User.model"

export const populateAuthor = {
  path: "author",
  select: { username: 1, image: 1 },
}

/**
 * Route: /user/:username
 *
 * Complete Route: /api/story/user/:username
 *
 * Method: GET
 *
 * Action: Get all stories (paginated) from a user with username as param, only return the first part of the story
 *
 * Auth required: No
 *
 */
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
          select: { parts: { $slice: 2 } },
          sort: { lastPartCreatedAt: -1 },
          populate: [populateAuthor],
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

/*
 * Route: /favorites
 *
 * Complete Route: /api/story/favorites
 *
 * Method: GET
 *
 * Action: Get all favorites stories from a user, only return the first part of the story
 *
 * Auth required: Yes (Require because we need get stories by favorites user prop)
 *
 */
export const getFavoritesStories = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { query } = req
      const { favorites } = await User.findById(req.user._id).select("favorites")
      const storiesPageData = await Story.paginate(
        {
          _id: {
            $in: favorites,
          },
        },
        {
          ...query,
          select: {
            parts: {
              $slice: 1,
            },
          },
          sort: { lastPartCreatedAt: -1 },
          populate: [populateAuthor],
        }
      )
      if (storiesPageData) {
        return res.status(200).json(storiesPageData)
      }
      return res.status(400).json({ message: "user hasn't favorites" })
    } catch (e) {
      return res.status(404).json({ message: "Error to get favorites" })
    }
  }
  return res.status(400).json({ message: "Error not user" })
}

/**
 * Route: /all
 *
 * Complete Route: /api/story/all
 *
 * Method: GET
 *
 * Action: Get all stories (paginated), only return the first part of the story
 *
 * Auth required: No
 *
 */
export const getAllStories = async (req: Request, res: Response): Promise<Response> => {
  try {
    const options = req.query
    const storiesPageData = await Story.paginate(
      {},
      {
        ...options,
        sort: { lastPartCreatedAt: -1 },
        select: { parts: { $slice: 1 } },
        populate: [populateAuthor],
      }
    )
    if (storiesPageData) {
      return res.status(200).json(storiesPageData)
    }
    return res.status(400).json({ message: "Error to get All Stories" })
  } catch (e) {
    return res.status(400).json({ message: "Catch Error to get All Story" })
  }
}
