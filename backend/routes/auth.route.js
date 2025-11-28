import express from "express";
import {
  signup,
  login,
  logout,
  refreshToken,
  getProfile,
  socialLogin,
} from "../controllers/auth.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "Auth routes are working!" });
});

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.post("/social-login", socialLogin);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);
router.get("/profile", protectRoute, getProfile);

export default router;

//GVxTUHLXPb6qp8OA
