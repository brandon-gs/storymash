/// <reference types="next" />
/// <reference types="next/types/global" />
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export type User = {
  type: string
  level: number
  points: number
  likes: number
  comments: number
  stories: Array<string>
  favorites: Array<string>
  followers: Array<string>
  following: Array<string>
  firstName: string
  lastName: string
  username: string
  email: string
  age: number
  gender: string
  about: string
  image: string
  createdAt: Date
  updatedAt: Date
}
