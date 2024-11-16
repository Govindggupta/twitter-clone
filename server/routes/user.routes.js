import express from "express";
import { protectRoute } from "../middleware/protectroute.js";
import {
  getUserProfile,
  followUnfollowUser,
  getSuggestedUsers,
  updateUser,
  getUserfollowing,
  getUserfollowers,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/profile/:username", protectRoute, getUserProfile);

router.get("/suggested", protectRoute, getSuggestedUsers);

router.post("/follow/:id", protectRoute, followUnfollowUser);

router.post("/update",protectRoute, updateUser);

router.get("/:user/following", protectRoute , getUserfollowing );

router.get("/:user/followers", protectRoute , getUserfollowers);

export default router;
