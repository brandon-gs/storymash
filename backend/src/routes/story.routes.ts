/*
  @url: /api/story
*/

import { Router } from "express"
import { requireAuth } from "../middlewares/authentication"
import {
  createStory,
  getStory,
  getStoriesByUsername,
  getFavoritesStories,
  updateStory,
  deleteStory,
  uploadStoryImage,
  getAllStories,
  addStoryView,
  getRandomStory,
} from "../controllers/story.controller"

const router = Router()

router.route("/").post(requireAuth, createStory).get(getAllStories)

router.route("/random").get(getRandomStory)

router.route("/favorites").get(requireAuth, getFavoritesStories)

router.route("/:id").get(getStory).put(requireAuth, updateStory).delete(requireAuth, deleteStory)

router.route("/image/:id").post(requireAuth, uploadStoryImage)

router.route("/user/:username").get(getStoriesByUsername)

router.route("/view/add/:id").put(requireAuth, addStoryView)

module.exports = router
