import mongoose, { Document, Schema } from "mongoose";

export interface IVideo extends Document {
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: number; // in seconds
  cloudinaryVideoId?: string;
  cloudinaryThumbnailId?: string;
}

const videoSchema = new Schema<IVideo>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail URL is required"],
    },
    videoUrl: {
      type: String,
      required: [true, "Video URL is required"],
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
    },
    cloudinaryVideoId: {
      type: String,
    },
    cloudinaryThumbnailId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Video = mongoose.model<IVideo>("Video", videoSchema);
export default Video;
