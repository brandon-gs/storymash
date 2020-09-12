/*
  @url: api/story/part
*/
import { Router } from "express"
const router = Router()

import {
  deleteStoryPart,
  updateStoryPart,
  createStoryPart,
  updateLikes,
} from "../controllers/story.part.controller"
import { requireAuth } from "../middlewares/authentication"

// id of story
router.post("/:id", requireAuth, createStoryPart)
// id of story part
router.put("/:id", requireAuth, updateStoryPart)
router.delete("/:id", requireAuth, deleteStoryPart)
router.put("/like/:id", requireAuth, updateLikes)

module.exports = router
