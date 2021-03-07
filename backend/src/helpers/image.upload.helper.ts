import { Request } from "express"
import path from "path"
import cloudinary from "cloudinary/"

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const generateRandomName = (currentImage: string) => {
  const possible = "abcdefghijklmnopqrstuvwxyz0123456789"
  let randomName = ""
  for (let i = 0; i < 6; i++) {
    randomName += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  if (randomName === currentImage.split("/").pop()) {
    generateRandomName(currentImage)
  }
  return randomName
}

export type ImageUploadObject = {
  message: string
  imageName?: string
}

export default async function imageUpload(req: Request): Promise<ImageUploadObject> {
  if (req.file) {
    const image = req.file
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    const validExt = [".png", ".jpg", ".jpeg"]
    const ext = path.extname(image.originalname).toLowerCase()
    if (result && validExt.includes(ext)) {
      return { imageName: result.url, message: "Image uploaded" }
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
