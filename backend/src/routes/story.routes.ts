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
} from "../controllers/story.controller"

const router = Router()

router.route("/").post(requireAuth, createStoryController)

router
  .route("/:id")
  .get(getStoryController)
  .put(requireAuth, updateStory)
  .delete(requireAuth, deleteStory)

router.route("/user/:username").get(getStoriesByUsername)

module.exports = router
