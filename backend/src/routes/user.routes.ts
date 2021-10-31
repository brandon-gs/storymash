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
  getAllUsernames,
  addFollower,
  removeFollower,
  getUsersByQuery,
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

router.route("/usernames").get(getAllUsernames)

router.route("/search/:query").get(getUsersByQuery)

router.route("/follow/:username").put(requireAuth, requireApiSecret, addFollower)
router.route("/unfollow/:username").put(requireAuth, requireApiSecret, removeFollower)

module.exports = router
