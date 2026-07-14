import { Response } from "express";
import WatchHistory from "../models/WatchHistory";
import { AuthRequest } from "../middleware/auth";

// @desc    Update watch progress
// @route   PUT /api/watch-history/:videoId
export const updateProgress = async (req: AuthRequest, res: Response) => {
  try {
    const { lastTimestamp, watchedPercentage } = req.body;

    const history = await WatchHistory.findOneAndUpdate(
      {
        userId: req.user._id,
        videoId: req.params.videoId,
      },
      {
        lastTimestamp,
        watchedPercentage,
        lastWatchedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    res.json(history);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get progress for a video
// @route   GET /api/watch-history/:videoId
export const getProgress = async (req: AuthRequest, res: Response) => {
  try {
    const history = await WatchHistory.findOne({
      userId: req.user._id,
      videoId: req.params.videoId,
    });

    res.json(history || { lastTimestamp: 0, watchedPercentage: 0 });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get recently watched videos
// @route   GET /api/watch-history
export const getRecentlyWatched = async (req: AuthRequest, res: Response) => {
  try {
    const history = await WatchHistory.find({ userId: req.user._id })
      .populate("videoId")
      .sort({ lastWatchedAt: -1 })
      .limit(6);

    res.json(history);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all watch progress for current user (for progress bars)
// @route   GET /api/watch-history/all/progress
export const getAllProgress = async (req: AuthRequest, res: Response) => {
  try {
    const history = await WatchHistory.find({ userId: req.user._id }).select(
      "videoId watchedPercentage lastTimestamp"
    );

    res.json(history);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
