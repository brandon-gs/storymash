import { IStoryPart } from "../models/StoryPart.model"

export function getLikesFromStory(parts: Array<string | IStoryPart>): number {
  const likes = parts.reduce((initial, part) => {
    if (typeof part !== "string") {
      return initial + part.likes.length
    }
    return initial
  }, 0)
  return likes
}

export function getCommentsFromStoryParts(parts: Array<string | IStoryPart>): number {
  const comments = parts.reduce((initial, part) => {
    if (typeof part !== "string") {
      return initial + part.comments.length
    }
    return initial
  }, 0)
  return comments
}
