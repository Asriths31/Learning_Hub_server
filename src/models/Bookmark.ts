import mongoose, { Document, Schema } from "mongoose";

export interface IBookmark extends Document {
  userId: mongoose.Types.ObjectId;
  videoId: mongoose.Types.ObjectId;
  title: string;
  timestamp: number; // in seconds
  createdAt: Date;
}

const bookmarkSchema = new Schema<IBookmark>(
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
    title: {
      type: String,
      default: "",
    },
    timestamp: {
      type: Number,
      required: [true, "Timestamp is required"],
    },
  },
  { timestamps: true }
);

const Bookmark = mongoose.model<IBookmark>("Bookmark", bookmarkSchema);
export default Bookmark;
