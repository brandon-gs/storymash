import { Request, Response } from "express"
import StoryPartModel from "../models/StoryPart.model"
import Comment from "../models/Comment.model"

const POPULATE_COMMENT = {
  path: "comments",
  populate: {
    path: "author",
    select: { _id: 1, username: 1, image: 1 },
  },
}

export const addComment = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { id } = req.params // StoryPart's id
      const { content } = req.body
      const comment = await new Comment({ author: req.user._id, content }).save()
      await StoryPartModel.findByIdAndUpdate(
        id,
        { $push: { comments: comment._id } },
        { new: true }
      )
      const commentResponse = {
        _id: comment._id,
        content,
        author: { _id: req.user._id, username: req.user.username, image: req.user.image },
        likes: comment.likes,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      }
      return res.status(200).json({ comment: commentResponse, message: "Comment created" })
    } catch (e) {
      return res
        .status(400)
        .json({ error: JSON.stringify(e), message: "Error while try creating a comment" })
    }
  }
  return res.status(401).json({ message: "Unauthorized, invalid token" })
}

export const getComments = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params
    const { comments } = await StoryPartModel.findById(id).populate(POPULATE_COMMENT)
    return res.status(200).json({ comments, message: "Comments obtained" })
  } catch (e) {
    return res
      .status(400)
      .json({ error: JSON.stringify(e), message: "Error while try obtaining comments" })
  }
}

export const updateComment = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { id } = req.params // Comment's id
      const { content } = req.body // New comment's content
      const comment = await Comment.findOne({ _id: id, author: req.user.id })
      /* Validate comment's author is equal to req.user */
      if (!comment) {
        return res.status(401).json({
          message: "Invalid comment id or Unauthorized, user isn't the  owner of the comment",
        })
      }

      // Update commen't content
      await comment.updateOne({ content }, { new: true })

      // Create comment response
      const commentResponse = {
        _id: comment._id,
        content,
        author: { _id: req.user._id, username: req.user.username, image: req.user.image },
        likes: comment.likes,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      }
      return res.status(200).json({ comment: commentResponse, message: "Comment updated" })
    } catch (e) {
      return res
        .status(400)
        .json({ error: JSON.stringify(e), message: "Error while try updating a comment" })
    }
  }
  return res.status(401).json({ message: "Unauthorized, invalid token" })
}

export const deleteComment = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { id } = req.params // Comment's id
      const comment = await Comment.findOneAndDelete({ _id: id, author: req.user._id })
      return res.status(200).json({ comment: comment, message: "Comment deleted" })
    } catch (e) {
      return res
        .status(400)
        .json({ error: JSON.stringify(e), message: "Error while try deleting a comment" })
    }
  }
  return res.status(401).json({ message: "Unauthorized, invalid token" })
}
