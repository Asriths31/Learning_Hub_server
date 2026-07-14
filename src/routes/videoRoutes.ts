import { Router } from "express";
import {
  getAllVideos,
  getVideoById,
  seedVideos,
} from "../controllers/videoController";

const router = Router();

router.get("/", getAllVideos);
router.post("/seed", seedVideos);
router.get("/:id", getVideoById);

export default router;
