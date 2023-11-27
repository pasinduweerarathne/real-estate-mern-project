import express from "express";
import {
  signIn,
  signUp,
  signInWithGoogle,
  userSignOut,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/sign-in", signIn);
router.post("/sign-up", signUp);
router.post("/google-sign-in", signInWithGoogle);
router.get("/sign-out", userSignOut);

export default router;
