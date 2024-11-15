import express from "express";
import { protectRoute } from "../middleware/protectroute.js";
import { searchUsers } from "../controllers/search.controllers.js";

const router = express.Router();

router.get("/", protectRoute, searchUsers);

export default router;