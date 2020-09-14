/*
  @url: /api/story
*/

import { Router } from "express"
import { requireAuth } from "../middlewares/authentication"
import {
  createStoryController,
  getStoryController,
  getStoriesByUsername,
  updateStory,
  deleteStory,
  uploadStoryImage,
} from "../controllers/story.controller"

const router = Router()

router.route("/").post(requireAuth, createStoryController)

router
  .route("/:id")
  .get(getStoryController)
  .put(requireAuth, updateStory)
  .delete(requireAuth, deleteStory)

router.route("/image/:id").post(requireAuth, uploadStoryImage)

router.route("/user/:username").get(getStoriesByUsername)

module.exports = router
