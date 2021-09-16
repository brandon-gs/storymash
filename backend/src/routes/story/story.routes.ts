/*
  @url: /api/story
*/
import { Router } from "express"
import { requireAuth } from "../../middlewares/authentication"
import {
  createStory,
  getStory,
  updateStory,
  deleteStory,
} from "../../controllers/story/story.controller"
import {
  getStoriesByUsername,
  getFavoritesStories,
  getAllStories,
} from "../../controllers/story/stories.controller"
import { uploadStoryImage } from "../../controllers/story/image.controller"
import { addStoryView } from "../../controllers/story/views.controller"
import { getStoryBySearch } from "../../controllers/story/search.controller"
import { getRandomStory } from "../../controllers/story/random.controller"
import { getStoriesPlank } from "../../controllers/story/plank.controller"

const router = Router()

router.route("/").post(requireAuth, createStory).get(getAllStories)

router.route("/random").get(getRandomStory)

router.route("/favorites").get(requireAuth, getFavoritesStories)

router.route("/plank").get(requireAuth, getStoriesPlank)

router.route("/:id").get(getStory).put(requireAuth, updateStory).delete(requireAuth, deleteStory)

router.route("/image/:id").put(requireAuth, uploadStoryImage)

router.route("/user/:username").get(getStoriesByUsername)

router.route("/view/add/:id").put(requireAuth, addStoryView)

router.route("/search/:query").get(getStoryBySearch)

module.exports = router
