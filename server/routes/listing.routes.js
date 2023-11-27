import express from "express";
import {
  createListing,
  getMyListings,
  deleteListing,
  editListing,
  getListings,
} from "../controllers/listing.controllers.js";
import { veryfyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create-listing", veryfyUser, createListing);
router.get("/get-mylistings", veryfyUser, getMyListings);
router.delete("/delete-listing/:id", veryfyUser, deleteListing);
router.post("/edit-listing/:id", veryfyUser, editListing);
router.get("/listings", getListings);

export default router;
