import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./db/db.js";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import searchRoutes from "./routes/search.routes.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json({ limit: "5mb" })); // limit should not be to high 
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/search", searchRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});

// 1:17:22 