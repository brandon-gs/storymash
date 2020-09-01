/*
  @url: /api/user
*/

import { Router } from "express"
import { requireAuth, requireApiSecret } from "../middlewares/authentication"
import {
  getUserFromToken,
  getUserFromUsername,
  updateUserFromToken,
  updateUserFromUsername,
  updateUserImage,
} from "../controllers/user.controller"

const router = Router()

router
  .route("/")
  .get(requireAuth, getUserFromToken)
  .post(requireAuth, updateUserImage)
  .put(requireAuth, updateUserFromToken)

router
  .route("/profile/:username")
  .get(getUserFromUsername)
  .put(requireAuth, requireApiSecret, updateUserFromUsername)

module.exports = router
