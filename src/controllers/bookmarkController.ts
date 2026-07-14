import { Response } from "express";
import Bookmark from "../models/Bookmark";
import { AuthRequest } from "../middleware/auth";

// @desc    Get bookmarks for a video
// @route   GET /api/bookmarks/:videoId
export const getBookmarks = async (req: AuthRequest, res: Response) => {
  try {
    const bookmarks = await Bookmark.find({
      userId: req.user._id,
      videoId: req.params.videoId,
    }).sort({ timestamp: 1 });

    res.json(bookmarks);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create bookmark
// @route   POST /api/bookmarks
export const createBookmark = async (req: AuthRequest, res: Response) => {
  try {
    const { videoId, title, timestamp } = req.body;

    const bookmark = await Bookmark.create({
      userId: req.user._id,
      videoId,
      title: title || `Bookmark at ${formatTime(timestamp)}`,
      timestamp,
    });

    res.status(201).json(bookmark);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete bookmark
// @route   DELETE /api/bookmarks/:id
export const deleteBookmark = async (req: AuthRequest, res: Response) => {
  try {
    const bookmark = await Bookmark.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    await bookmark.deleteOne();
    res.json({ message: "Bookmark deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Helper to format seconds to MM:SS
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}
