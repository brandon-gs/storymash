import { Document } from "mongoose"

// Types
export interface ICommentAuthor {
  _id: string
  username: string
  image: string
}

export interface IComment {
  author: ICommentAuthor
  content: string
  likes: Array<string>
  createdAt: Date
  updatedAt: Date
}

export interface IStoryPart {
  comments: Array<IComment>
  likes: Array<string>
  content: string
  createdAt: Date
  updatedAt: Date
}

export interface IStory extends Document {
  author: string
  title: string
  image: string
  category: Array<string>
  lastPartCreatedAt: Date
  createdAt: Date
  updatedAt: Date
  views: Array<string>
  totalLikes: number
  totalComments: number
  totalRankPoints: number
  totalParts: number
  parts: Array<IStoryPart>
  populateAuthor: () => Promise<VoidFunction>
}
