import { Router } from "express";
import {
  getBookmarks,
  createBookmark,
  deleteBookmark,
} from "../controllers/bookmarkController";
import auth from "../middleware/auth";

const router = Router();

// All bookmark routes require auth
router.use(auth);

router.get("/:videoId", getBookmarks);
router.post("/", createBookmark);
router.delete("/:id", deleteBookmark);

export default router;
