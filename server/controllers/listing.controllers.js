import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const getListings = async (req, res, next) => {
  try {
    if (Object.keys(req.query).length > 0) {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      const searchTerm = req.query.searchTerm || "";
      const sort = req.query.sort || "createdAt";
      const order = req.query.order || "desc";
      let offer = req.query.offer;
      let furnished = req.query.furnished;
      let parking = req.query.parking;
      let type = req.query.type;

      if (offer === undefined || offer === "false") {
        offer = { $in: [false, true] };
      }
      if (furnished === undefined || furnished === "false") {
        furnished = { $in: [false, true] };
      }
      if (parking === undefined || parking === "false") {
        parking = { $in: [false, true] };
      }
      if (type === undefined || type === "all") {
        type = { $in: ["sale", "rent"] };
      }

      const listings = await Listing.find({
        name: { $regex: searchTerm, $options: "i" },
        offer,
        furnished,
        parking,
        type,
      })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);

      res.send(listings);
    } else {
      const listings = await Listing.find();
      res.status(200).json(listings);
    }
  } catch (error) {
    next(error);
  }
};

export const createListing = async (req, res, next) => {
  try {
    const body = req.body;
    body.userRef = req.user.id;
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getMyListings = async (req, res, next) => {
  try {
    const myListings = await Listing.find({ userRef: req.user.id });
    res.status(200).json(myListings);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    res.status(201).json({
      id: deletedListing._id,
    });
  } catch (error) {
    next(error);
  }
};

export const editListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  // check listing exist
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  // check the listing belong to logged user
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can lonly update your own listings!"));
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      listing._id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
