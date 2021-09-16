declare module "react-butterfiles"
declare module "intersection-observer"

declare type ValidationReturn = string | null

declare type OnChangeInputType = ChangeEvent<HTMLTextAreaElement | HTMLInputElement>

declare type Message = {
  message: string
}

declare type Story = {
  _id: string
  author: { image: string; _id: string; username: string }
  title: string
  category: Array<string>
  image: string
  parts: Array<StoryPart>
  views: Array<string>
}

declare type StoryPart = {
  content: string
  likes: Array<string>
  comments: StoryPartComment[]
  createdAt: Date
}

declare type Author = {
  username: string
  image: string
  _id: string
}

declare type StoryPartComment = {
  content: string
  likes: string[]
  createdAt: Date
  updatedAt: Date
}

declare type User = {
  _id: string
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

declare type LoginForm = {
  username: string
  password: string
  showPassword?: boolean
}

declare type RegisterForm = {
  firstName: ValidationReturn
  lastName: ValidationReturn
  username: ValidationReturn
  email: ValidationReturn
  age: number | null
  gender: ValidationReturn
  password: ValidationReturn
  terms: boolean | undefined
  showPassword?: boolean | null
}

declare type StoryForm = {
  title?: string
  category?: Array<string>
  content?: string
}

declare type RegisterFormErrors = {
  firstName: ValidationReturn
  lastName: ValidationReturn
  username: ValidationReturn
  age: ValidationReturn
  password: ValidationReturn
  terms: ValidationReturn
  email: ValidationReturn
  gender: ValidationReturn
  hasError?: boolean
}

declare type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

declare type FilesProps = {
  browseFiles: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
}

declare interface RandomStoryResponse {
  data: {
    docs: Array<Story>
  }
}
