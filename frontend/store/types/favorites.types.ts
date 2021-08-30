export const UPDATE_FAVORITE_STORIES = "UPDATE_FAVORITE_STORIES"

interface FavoriteStory {
  _id: string
  story: Story
  storyPart: string
}

export type FavoriteStoriesState = FavoriteStory[]
