import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import videoRoutes from "./routes/videoRoutes";
import bookmarkRoutes from "./routes/bookmarkRoutes";
import watchHistoryRoutes from "./routes/watchHistoryRoutes";
import adminRoutes from "./routes/adminRoutes";

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173","https://learning-hub-khaki.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/watch-history", watchHistoryRoutes);
app.use("/api/admin", adminRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Learning Portal API is running" });
});

// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

export default app;
