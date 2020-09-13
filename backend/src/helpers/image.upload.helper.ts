import { Request } from "express"
import fs from "fs-extra"
import path from "path"

const createDir = (dir: string) => {
  // create new directory
  try {
    // first check if directory already exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
  } catch (err) {
    console.error(err)
  }
}

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

export default async function imageUpload(
  req: Request,
  folder: string,
  currentImage: string
): Promise<ImageUploadObject> {
  if (req.file) {
    const image = req.file
    const ext = path.extname(image.originalname).toLowerCase()
    const name = generateRandomName(currentImage)
    const imageName = `${name}${ext}`
    const targetPath = path.resolve(`frontend/public/img/${folder}/${imageName}`)
    createDir(path.resolve(`frontend/public/img/${folder}`))
    const validExt = [".png", ".jpg", ".jpeg"]
    if (validExt.includes(ext)) {
      await fs.rename(image.path, targetPath)
      return { imageName: `/img/${folder}/${imageName}`, message: `Image upload in ${folder}` }
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
