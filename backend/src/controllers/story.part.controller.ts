import StoryPart from "../models/StoryPart.model"
import User from "../models/User.model"
import Story from "../models/Story.model"
import { Request, Response } from "express"

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
        await Story.findOneAndUpdate({ _id: id }, { parts }, { new: true })
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

export const updateLikes = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      const { id } = req.params // id of story part
      const { option } = req.body // This option can have value "add" or "remove"
      const { _id } = req.user
      const storyPart = await StoryPart.findById(id)
      if (storyPart) {
        const story = await Story.findById(storyPart.story)
        let author = await User.findById(storyPart.author)
        // Add or remove id user to array likes in story part
        let newLikes = author.likes
        if (storyPart) {
          if (storyPart?.likes.includes(_id)) {
            const copyLikes = storyPart.likes.slice(0)
            const indexOfUser = copyLikes.indexOf(_id)
            copyLikes.splice(indexOfUser, 1)
            storyPart.likes = copyLikes
            newLikes -= 1
          } else {
            storyPart.likes = [...storyPart.likes, _id]
            newLikes += 1
          }
        }
        // Update views in story
        if (story && !story.views.includes(_id) && storyPart?.author !== _id) {
          story.views = [...story.views, _id]
        }
        // Update or remove story from user favorites
        let favorites = req.user.favorites.slice(0)
        if (story) {
          if (option === "remove") {
            favorites.splice(favorites.indexOf(story._id), 1)
          } else if (option === "add") {
            favorites = [...favorites, story._id]
          }
        }
        author = await User.findByIdAndUpdate(storyPart.author, { likes: newLikes }, { new: true })
        await User.findByIdAndUpdate(_id, { favorites }, { new: true })
        await storyPart.save()
        await story?.save()
        await story?.populateAuthor()
        await story?.populateParts()
        return res.status(200).json({
          author,
          story,
          message: "Add like to creathor and part story",
        })
      } else {
        return res.status(404).json({ message: "Story part don't found" })
      }
    } catch (e) {
      return res.status(404).json({ message: "Story part do not found or something wrong" })
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
