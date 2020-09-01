/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IUser } from "../models/User.model"

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}
