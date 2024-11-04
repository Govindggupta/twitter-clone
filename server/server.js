import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./db/db.js";

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});