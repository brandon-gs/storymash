import { Request } from "express"

const publicFields = ["likes", "followers", "notifications"]
export function hasOnlyPublicFields(req: Request): boolean {
  if (req.body.length > publicFields.length) return false
  for (const field in req.body) {
    if (!publicFields.includes(field)) return false
  }
  return true
}
