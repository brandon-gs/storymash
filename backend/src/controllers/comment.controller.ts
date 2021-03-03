import { Request, Response } from "express"
import StoryPartModel from "../models/StoryPart.model"
import Comment from "../models/Comment.model"

export const addComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (req.user) {
    const { id } = req.params
    const { content } = req.body
    const comment = await new Comment({ author: req.user._id, content }).save()
    const storyPart = await StoryPartModel.findByIdAndUpdate(
      id,
      { $push: { comments: comment._id } },
      { new: true }
    ).populate({
      path: "comments",
      populate: {
        path: "author",
        select: { username: 1, image: 1 },
      },
    })
    return res.status(200).json({ storyPart, message: "Comment created" })
  }
  return res.status(400).json({ message: "Unauthorized" })
}
