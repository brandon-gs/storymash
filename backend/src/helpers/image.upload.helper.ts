import { Request } from "express"
import fs from "fs-extra"
import path from "path"

export type ImageUploadObject = {
  message: string
  imageName?: string
}

export default async function imageUpload(
  req: Request,
  folder: string,
  name: string
): Promise<ImageUploadObject> {
  if (req.file) {
    const image = req.file
    const ext = path.extname(image.originalname).toLowerCase()
    const imageName = `${name}${ext}`
    const targetPath = path.resolve(
      `frontend/public/img/${folder}/${imageName}`
    )
    const validExt = [".png", ".jpg", ".jpeg"]
    if (validExt.includes(ext)) {
      await fs.rename(image.path, targetPath)
      return { imageName, message: `Image upload in ${folder}` }
    }
    return {
      imageName: "",
      message: "Invalid file extension",
    }
  }
  return {
    imageName: "",
    message: "No image, assign model default pre function",
  }
}
