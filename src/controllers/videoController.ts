import { Request, Response } from "express";
import Video from "../models/Video";

// @desc    Get all videos
// @route   GET /api/videos
export const getAllVideos = async (_req: Request, res: Response) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single video
// @route   GET /api/videos/:id
export const getVideoById = async (req: Request, res: Response) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.json(video);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Seed sample videos
// @route   POST /api/videos/seed
export const seedVideos = async (_req: Request, res: Response) => {
  try {
    // Clear existing videos
    await Video.deleteMany({});

    const sampleVideos = [
      {
        title: "Introduction to JavaScript",
        description:
          "Learn the fundamentals of JavaScript programming language including variables, data types, functions, and control flow.",
        thumbnail: "https://img.youtube.com/vi/W6NZfCO5SIk/maxresdefault.jpg",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        duration: 596,
      },
      {
        title: "React Crash Course",
        description:
          "A complete beginner's guide to React. Learn components, state, props, hooks, and build a project from scratch.",
        thumbnail: "https://img.youtube.com/vi/w7ejDZ8SWv8/maxresdefault.jpg",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        duration: 653,
      },
      {
        title: "Node.js for Beginners",
        description:
          "Master Node.js basics including modules, file system, HTTP server, Express.js, and RESTful APIs.",
        thumbnail: "https://img.youtube.com/vi/TlB_eWDSMt4/maxresdefault.jpg",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        duration: 15,
      },
      {
        title: "MongoDB Complete Tutorial",
        description:
          "Everything you need to know about MongoDB - CRUD operations, indexing, aggregation, and Mongoose ODM.",
        thumbnail: "https://img.youtube.com/vi/ofme2o29ngU/maxresdefault.jpg",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        duration: 15,
      },
      {
        title: "TypeScript Essentials",
        description:
          "Learn TypeScript from scratch - types, interfaces, generics, enums, and how to use it with React and Node.js.",
        thumbnail: "https://img.youtube.com/vi/BwuLxPH8IDs/maxresdefault.jpg",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        duration: 60,
      },
      {
        title: "CSS Flexbox & Grid",
        description:
          "Master modern CSS layouts with Flexbox and Grid. Build responsive designs that work on all screen sizes.",
        thumbnail: "https://img.youtube.com/vi/JJSoEo8JSnc/maxresdefault.jpg",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        duration: 15,
      },
      {
        title: "Git & GitHub Fundamentals",
        description:
          "Learn version control with Git and GitHub. Covers branching, merging, pull requests, and collaboration workflows.",
        thumbnail: "https://img.youtube.com/vi/RGOj5yH7evk/maxresdefault.jpg",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        duration: 12,
      },
      {
        title: "REST API Design Best Practices",
        description:
          "Design clean and scalable REST APIs. Learn about HTTP methods, status codes, authentication, and API versioning.",
        thumbnail: "https://img.youtube.com/vi/fgTGADljAeg/maxresdefault.jpg",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        duration: 888,
      },
    ];

    const videos = await Video.insertMany(sampleVideos);
    res.status(201).json({
      message: `${videos.length} sample videos seeded successfully`,
      videos,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
