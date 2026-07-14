import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import Video from "../models/Video";
import cloudinary from "../config/cloudinary";

// @desc    Get Cloudinary signature for signed direct uploads from frontend
// @route   GET /api/admin/cloudinary-signature
export const getCloudinarySignature = async (req: AuthRequest, res: Response) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const paramsToSign = {
      timestamp,
      folder: "learning_portal",
    };
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
    );
    res.json({
      signature,
      timestamp,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder: "learning_portal",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to generate signature" });
  }
};

// @desc    Create video document with Cloudinary metadata
// @route   POST /api/admin/videos
export const createVideo = async (req: AuthRequest, res: Response) => {
  try {
    const {
      title,
      description,
      thumbnail,
      videoUrl,
      duration,
      cloudinaryVideoId,
      cloudinaryThumbnailId,
    } = req.body;

    if (!title || !description || !thumbnail || !videoUrl) {
      return res.status(400).json({ message: "All video details are required" });
    }

    const video = await Video.create({
      title,
      description,
      thumbnail,
      videoUrl,
      duration: Math.round(duration || 0),
      cloudinaryVideoId,
      cloudinaryThumbnailId,
    });

    res.status(201).json({
      message: "Video registered successfully",
      video,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to create video record" });
  }
};

// @desc    Delete video from Cloudinary and database
// @route   DELETE /api/admin/videos/:id
export const deleteVideo = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Delete thumbnail from Cloudinary if public ID exists
    if (video.cloudinaryThumbnailId) {
      try {
        await cloudinary.uploader.destroy(video.cloudinaryThumbnailId, {
          resource_type: "image",
        });
      } catch (err) {
        console.error("Cloudinary thumbnail deletion error:", err);
      }
    }

    // Delete video from Cloudinary if public ID exists
    if (video.cloudinaryVideoId) {
      try {
        await cloudinary.uploader.destroy(video.cloudinaryVideoId, {
          resource_type: "video",
        });
      } catch (err) {
        console.error("Cloudinary video deletion error:", err);
      }
    }

    await video.deleteOne();
    res.json({ message: "Video and associated files deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to delete video" });
  }
};

// @desc    Get all videos for admin management (with Cloudinary IDs)
// @route   GET /api/admin/videos
export const getAllVideosAdmin = async (req: AuthRequest, res: Response) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
