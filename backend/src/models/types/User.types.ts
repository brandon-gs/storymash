import { Document } from "mongoose"

// Types
export interface ObjectUser {
  email: string
  firstName: string
  lastName: string
  username: string
  password: string
  gender: string
  age: number
  points: number
  image: string
  about: string
  stories: Array<string>
  following: Array<string>
  followers: Array<string>
  favorites: Array<{ story: string; storyPart: string }>
  type: string
  likes: number
  comments: number
  level: number
  createdAt: Date
  updatedAt: Date
  getPublicData: () => PublicDataUser
}

export type PublicDataUser = Omit<ObjectUser & { _id: string }, "password">

export interface IUser extends ObjectUser, Document {
  matchPassword: (password: string) => Promise<boolean>
}
