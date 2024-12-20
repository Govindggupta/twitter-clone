import express from "express";
import { login, logout, signup , getme} from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/protectroute.js";

const router = express.Router();

router.get("/me", protectRoute, getme);

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;
