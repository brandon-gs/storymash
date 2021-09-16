/*
  @url: api/story/part
*/
import { Router } from "express"
const router = Router()

import {
  deleteStoryPart,
  updateStoryPart,
  createStoryPart,
} from "../../controllers/story/parts.controller"
import { addLike, removeLike } from "../../controllers/story/likes.controller"
import { requireAuth } from "../../middlewares/authentication"

// Story part
router.post("/:storyId", requireAuth, createStoryPart)
router.put("/:storyId/:storyPartIndex", requireAuth, updateStoryPart)
router.delete("/:storyId/:storyPartIndex", requireAuth, deleteStoryPart)
// likes
router.put("/like/add/:storyId/:storyPartIndex", requireAuth, addLike)
router.put("/like/remove/:storyId/:storyPartIndex", requireAuth, removeLike)

module.exports = router
