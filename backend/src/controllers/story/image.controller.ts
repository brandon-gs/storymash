// Types
import { Request, Response } from "express"
// Models
import Story from "../../models/Story.model"
// Helpers
import imageUpload from "../../helpers/image.upload.helper"

/**
 * Route: /image/:id
 *
 * Complete Route: /api/story/image/:id
 *
 * Method: PUT
 *
 * Action: Create a story, add it to the author.stories and add points to the author
 *
 * Auth required: Yes
 *
 */
export const uploadStoryImage = async (req: Request, res: Response): Promise<Response> => {
  if (req.user) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Not image provided" })
      }
      const { id } = req.params

      // Upload image to cloudinary
      const { imageName, message } = await imageUpload(req)

      // Update story image
      if (imageName) {
        const story = await Story.findByIdAndUpdate(id, {
          image: imageName,
        })
        return res.status(200).json({ story, message })
      }
      // Return message error to upload
      return res.status(400).json({ message: "Can't upload image" })
    } catch (e) {
      console.log(e)
      console.log("error: ", JSON.stringify(e))
      return res.status(404).json({ error: JSON.stringify(e), message: "Not story found" })
    }
  }
  return res.status(401).json({ message: "Unauthorized" })
}
