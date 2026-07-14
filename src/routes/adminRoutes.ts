import { Router } from "express";
import { getCloudinarySignature, createVideo, deleteVideo, getAllVideosAdmin } from "../controllers/adminController";
import auth, { admin } from "../middleware/auth";

const router = Router();

// Protect all admin routes with auth and admin role check
router.use(auth, admin);

router.get("/videos", getAllVideosAdmin);
router.get("/cloudinary-signature", getCloudinarySignature);

router.post("/videos", createVideo);

router.delete("/videos/:id", deleteVideo);

export default router;
