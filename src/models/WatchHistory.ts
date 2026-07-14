import mongoose, { Document, Schema } from "mongoose";

export interface IWatchHistory extends Document {
  userId: mongoose.Types.ObjectId;
  videoId: mongoose.Types.ObjectId;
  lastTimestamp: number; // in seconds
  watchedPercentage: number; // 0 to 100
  lastWatchedAt: Date;
}

const watchHistorySchema = new Schema<IWatchHistory>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
    lastTimestamp: {
      type: Number,
      default: 0,
    },
    watchedPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    lastWatchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Compound index so each user has one record per video
watchHistorySchema.index({ userId: 1, videoId: 1 }, { unique: true });

const WatchHistory = mongoose.model<IWatchHistory>(
  "WatchHistory",
  watchHistorySchema
);
export default WatchHistory;
