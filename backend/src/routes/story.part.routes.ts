/*
  @url: api/story/part
*/
import { Router } from "express"
const router = Router()

import {
  deleteStoryPart,
  updateStoryPart,
  createStoryPart,
  addLike,
  removeLike,
} from "../controllers/story.part.controller"
import { requireAuth } from "../middlewares/authentication"

// id of story necessary to add storypart to story
router.post("/:id", requireAuth, createStoryPart)
// id of story part
router.put("/:id", requireAuth, updateStoryPart)
router.delete("/:id", requireAuth, deleteStoryPart)
router.put("/like/add/:id", requireAuth, addLike)
router.put("/like/remove/:id", requireAuth, removeLike)

module.exports = router
