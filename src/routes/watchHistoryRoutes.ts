import { Router } from "express";
import {
  updateProgress,
  getProgress,
  getRecentlyWatched,
  getAllProgress,
} from "../controllers/watchHistoryController";
import auth from "../middleware/auth";

const router = Router();

// All watch history routes require auth
router.use(auth);

router.get("/", getRecentlyWatched);
router.get("/all/progress", getAllProgress);
router.get("/:videoId", getProgress);
router.put("/:videoId", updateProgress);

export default router;
