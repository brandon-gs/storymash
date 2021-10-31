// Types
import { Request, Response } from "express"
import { IComment } from "../../models/types/Story.types"
// Models
import Story from "../../models/Story.model"

const COMMENTS_RANK_PONTS = 0.2

/**
 * Route: /comment/:storyId/:storyPartIndex
 *
 * Complete Route: /api/story/comment/:storyId/:storyPartIndex
 *
 * Method: PUT
 *
 * Action: Add a comment to the :storyId in the :storyPartIndex
 *
 * Auth required: Yes
 *
 */
export const addComment = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { storyId, storyPartIndex } = req.params // StoryPart's index
      const { content } = req.body
      // Create comment
      const comment: IComment = {
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: [],
        author: { _id: req.user._id, username: req.user.username, image: req.user.image },
      }
      // Add comment to Story part
      await Story.findByIdAndUpdate(
        storyId,
        {
          $push: {
            [`parts.${storyPartIndex}.comments`]: {
              $each: [comment],
              $position: 0,
            },
          },
          $inc: { totalComments: 1, totalRankPoints: COMMENTS_RANK_PONTS },
        },
        { new: true }
      )
      return res.status(200).json({ comment, message: "Comment created" })
    } catch (e) {
      return res
        .status(400)
        .json({ error: JSON.stringify(e), message: "Error while try creating a comment" })
    }
  }
  return res.status(401).json({ message: "Unauthorized, invalid token" })
}

/**
 * Route: /comment/:storyId/:storyPartIndex
 *
 * Complete Route: /api/story/comment/:storyId/:storyPartIndex
 *
 * Method: GET
 *
 * Action: Get all comments from the :storyId in the :storyPartIndex
 *
 * Auth required: No
 *
 */
export const getComments = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { storyId, storyPartIndex } = req.params
    const story = await Story.findById(storyId)
    const { comments } = story.parts[storyPartIndex]
    return res.status(200).json({ comments, message: "Comments obtained" })
  } catch (e) {
    return res
      .status(400)
      .json({ error: JSON.stringify(e), message: "Error while try obtaining comments" })
  }
}

/**
 * Route: /comment/:storyId/:storyPartIndex/:commentIndex
 *
 * Complete Route: /api/story/comment/:storyId/:storyPartIndex/:commentIndex
 *
 * Method: PUT
 *
 * Action: Update comment from the :storyId in the :storyPartIndex in the :commentIndex
 *
 * Auth required: Yes
 *
 */
export const updateComment = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { storyId, storyPartIndex, commentIndex } = req.params
      const { content } = req.body // New comment's content
      const commentPath = `parts.${storyPartIndex}.comments.${commentIndex}`
      // Search story
      const story = await Story.findOneAndUpdate(
        { _id: storyId, author: req.user._id },
        {
          $set: {
            [`${commentPath}.content`]: content,
            [`${commentPath}.updatedAt`]: new Date(),
          },
        },
        { new: true }
      ).populate({
        path: "",
      })
      // Validate comment's author is equal to req.user
      if (!story) {
        return res.status(401).json({
          message: "User isn't the  owner of the comment",
        })
      }

      // Select updated comment
      const comment = story.parts[storyPartIndex].comments[commentIndex]

      return res.status(200).json({ comment, message: "Comment updated" })
    } catch (e) {
      return res
        .status(400)
        .json({ error: JSON.stringify(e), message: "Error while try updating a comment" })
    }
  }
  return res.status(401).json({ message: "Unauthorized, invalid token" })
}

/**
 * Route: /comment/:storyId/:storyPartIndex/:commentIndex
 *
 * Complete Route: /api/story/comment/:storyId/:storyPartIndex/:commentIndex
 *
 * Method: DELETE
 *
 * Action: DELETE comment from the :storyId in the :storyPartIndex in the :commentIndex
 *
 * Auth required: Yes
 *
 */
export const deleteComment = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { storyId, storyPartIndex, commentIndex } = req.params

      // Delete comment
      await Story.findOneAndUpdate(
        { _id: storyId },
        {
          $unset: {
            [`parts.${storyPartIndex}.comments.${commentIndex}`]: null,
          },
          $inc: { totalComments: -1, totalRankPoints: -COMMENTS_RANK_PONTS },
        }
      )
      await Story.findOneAndUpdate(
        { _id: storyId },
        {
          $pull: {
            [`parts.${storyPartIndex}.comments`]: null,
          },
        }
      )

      return res.status(200).json({ message: "Comment deleted" })
    } catch (e) {
      return res
        .status(400)
        .json({ error: JSON.stringify(e), message: "Error while try deleting a comment" })
    }
  }
  return res.status(401).json({ message: "Unauthorized, invalid token" })
}
