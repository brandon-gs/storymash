/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IUser } from "../models/types/User.types"

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}
