import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
} from "../controllers/user.controller.js";
import { veryfyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.patch("/update-user/:id", veryfyUser, updateUser);
router.delete("/delete-user/:id", veryfyUser, deleteUser);
router.get("/get-user/:id", getUser);

export default router;
