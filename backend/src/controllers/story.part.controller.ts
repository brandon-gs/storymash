import StoryPart from "../models/StoryPart.model"
import User from "../models/User.model"
import Story from "../models/Story.model"
import { Request, Response } from "express"
import { Points } from "../helpers/points.heleprs"

export const createStoryPart = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { id } = req.params // Story id
      const { _id } = req.user
      const { content } = req.body
      const story = await Story.findById(id)
      const newStoryPart = await new StoryPart({
        content,
        author: story?.author,
        story: story?.id,
      }).save()
      if (story) {
        const parts = [...story.parts, newStoryPart._id]
        await Story.findOneAndUpdate(
          { _id: id },
          { parts, lastPartCreatedAt: new Date() },
          { new: true }
        )
        const user = await User.findById(_id)
        return res.status(200).json({ user, message: "Parte creada" })
      }
      return res.status(400).json({ message: "Story dont found" })
    } catch (error) {
      return res.status(403).json({ message: "Story part dont was created" })
    }
  }
  return res.status(401).json({ message: "Story part dont was created" })
}

export const updateStoryPart = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { id } = req.params
      const { _id } = req.user
      const storyPart = await StoryPart.findOneAndUpdate({ _id: id }, req.body, { new: true })
      const user = await User.findById(_id)
      return res.status(200).json({ user, storyPart, message: "Parte de la historia actualizada" })
    } catch (e) {
      return res.status(404).json({ message: "Story part do not found" })
    }
  }
  return res.status(401).json({ message: "Not authorized" })
}

export const addLike = async (req: Request, res: Response) => {
  if (req.user) {
    try {
      const userId = req.user.id
      const storyPartId = req.params.id
      // Get storyPart and add userId to storyPart's likes
      const storyPart = await StoryPart.findByIdAndUpdate(
        storyPartId,
        { $push: { likes: userId } },
        { new: true }
      )
      if (storyPart) {
        // Add like to story
        let story = await Story.findByIdAndUpdate(
          storyPart.story,
          { $inc: { totalLikes: 1 } },
          { new: true }
        )

        // Add view to story
        if (story) {
          const userView = story.views.includes(userId)
          if (!userView) {
            story = await Story.findByIdAndUpdate(
              storyPart.story,
              { $push: { views: userId } },
              { new: true }
            )
          }
        }
        // Add 1 like to author likes and points
        const author = await User.findByIdAndUpdate(storyPart.author, {
          $inc: { likes: 1, points: Points.STORY_PART_LIKE },
        })
        // Add idStoryPart to user's favorites stories
        await User.findByIdAndUpdate(userId, {
          $push: { favorites: { story: storyPart.story, storyPart: storyPartId } },
        })
        // Populate story
        if (story) {
          await story.populateAuthor()
          await story.populateParts()
        }
        return res.status(200).json({ author, story })
      }
    } catch (e) {
      res.status(400).json({ message: "Something wrong" })
    }
  }
  return res.status(401).json({ message: "Not authorized" })
}

export const removeLike = async (req: Request, res: Response) => {
  if (req.user) {
    try {
      const userId = req.user.id
      const storyPartId = req.params.id
      // Get storyPart and remove userId to storyPart's likes
      const storyPart = await StoryPart.findByIdAndUpdate(
        storyPartId,
        { $pull: { likes: userId } },
        { new: true }
      )
      if (storyPart) {
        // Remove 1 like to author likes and points
        const author = await User.findByIdAndUpdate(storyPart.author, {
          $inc: { likes: -1, points: -Points.STORY_PART_LIKE },
        })
        // Remove idStoryPart to user's favorites stories
        await User.findByIdAndUpdate(userId, {
          $pull: { favorites: { story: storyPart.story, storyPart: storyPartId } },
        })
        // Get story
        const story = await Story.findByIdAndUpdate(
          storyPart.story,
          { $inc: { totalLikes: -1 } },
          { new: true }
        )
        if (story) {
          await story.populateAuthor()
          await story.populateParts()
        }
        return res.json({ author, story })
      }
    } catch (e) {
      res.status(400).json({ message: "Something wrong" })
    }
  }
  return res.status(401).json({ message: "Not authorized" })
}

export const deleteStoryPart = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { likes } = req.user
      const { id } = req.params
      const storyPart = await StoryPart.findOneAndDelete({ _id: id })
      if (storyPart) {
        const story = await Story.findById(storyPart.story)
        if (story) {
          // Sub likes from story part to author
          const newLikes = likes - storyPart.likes.length
          await User.findByIdAndUpdate(storyPart.author, { likes: newLikes })
          // Remove story part from "favorites in
          await story.populateAuthor()
          await story.populateParts()
          return res.status(200).json({ story, message: "Parte de la historia eliminada" })
        }
        return res.status(404).json({ message: "Story not found" })
      }
      return res.status(404).json({ message: "Story part not found" })
    } catch (e) {
      return res.status(404).json({ message: "Story part not found" })
    }
  }
  return res.status(401).json({ message: "Not authorized" })
}
