import passport from "passport"
import { Request, Response, NextFunction } from "express"

export const requireAuth = passport.authenticate("jwt", { session: false })
export const requireLogin = passport.authenticate("local", { session: false })
export const requireApiSecret = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const api_key = req.headers["api-authorization"]
  if (api_key === process.env.API_SECRET) {
    next()
  } else {
    return res.status(404).json({ message: "Unauthorized" })
  }
}
