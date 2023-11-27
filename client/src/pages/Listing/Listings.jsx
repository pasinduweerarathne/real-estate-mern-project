import React, { useEffect } from "react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteListing } from "../../app/listing/listingActions";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { app } from "../../firebase";
import { notify } from "../../common";

const Listings = ({ listing }) => {
  const dispatch = useDispatch();

  const { error: err } = useSelector((state) => state.listing);
  const { user } = useSelector((state) => state.user);

  const handleDeleteListing = (id) => {
    dispatch(deleteListing(id));

    listing.imageURLs.forEach((url) => {
      const storage = getStorage(app);
      const storageRef = ref(storage, url);

      deleteObject(storageRef)
        .then(() => {
          notify("success", "Listing deleted successfully");
        })
        .catch((error) => {
          if (error) notify("error", err);
        });
    });
  };

  return (
    <div key={listing._id} className="relative">
      <Link to={`/listings/${listing._id}`}>
        <img
          src={listing.imageURLs[0]}
          alt=""
          className="h-[170px] w-full object-cover rounded-xl"
        />
      </Link>
      <div className="flex justify-between">
        <h1 className="font-semibold line-clamp-1">{listing.name}</h1>
        <p>
          <span className="font-bold">$</span>
          {listing.regularPrice}
        </p>
      </div>
      <p>Bed Rooms: {listing.bedrooms}</p>
      <p>Bath Rooms: {listing.bathrooms}</p>

      {user && listing.userRef === user._id && (
        <div className="absolute top-1 right-1 flex gap-2">
          <button
            className="bg-white hover:bg-blue-700 rounded-full p-1 group transition duration-200"
            onClick={() => handleDeleteListing(listing._id)}
          >
            <MdDeleteOutline size={25} className="group-hover:text-white" />
          </button>
          <Link
            to={`/create-listing/${listing._id}`}
            className="bg-white hover:bg-yellow-400 rounded-full p-1 group transition duration-200"
          >
            <MdEdit size={25} className="group-hover:text-white" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Listings;
