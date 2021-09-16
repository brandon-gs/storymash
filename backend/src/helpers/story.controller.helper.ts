import { IStoryPart } from "../models/types/Story.types"

export function getLikesFromStory(parts: Array<IStoryPart>): number {
  const likes = parts.reduce((initial, part) => {
    return initial + part.likes.length
  }, 0)
  return likes
}

export function getCommentsFromStoryParts(parts: Array<IStoryPart>): number {
  const comments = parts.reduce((initial, part) => {
    return initial + part.comments.length
  }, 0)
  return comments
}
