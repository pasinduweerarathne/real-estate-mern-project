import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllListings } from "../../app/listing/listingActions";
import Listings from "../Listing/Listings";
import Loading from "../../components/Loading";
import Slider from "../../components/Slider";
import {
  fetchOfferListings,
  fetchRentListings,
  fetchSaleListings,
} from "./services";
import { Link } from "react-router-dom";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListing, setRentListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);

  const { allListings, loading } = useSelector((state) => state.listing);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllListings());

    fetchOfferListings().then((res) => setOfferListings(res));

    fetchRentListings().then((res) => setRentListing(res));

    fetchSaleListings().then((res) => setSaleListing(res));
  }, []);

  return (
    <div className="flex flex-col mt-10">
      <div className="w-full py-10 px-4">
        <Slider />
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
          {offerListings && offerListings.length > 0 && (
            <div>
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent offers
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?offer=true"}
                >
                  Show more offers
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 py-4 px-4">
                {offerListings &&
                  offerListings.map((listing) => (
                    <Listings key={listing._id} listing={listing} />
                  ))}
              </div>
            </div>
          )}

          {rentListing && rentListing.length > 0 && (
            <div>
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent places for rent
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?type=rent"}
                >
                  Show more places for rent
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 py-4 px-4">
                {rentListing &&
                  rentListing.map((listing) => (
                    <Listings key={listing._id} listing={listing} />
                  ))}
              </div>
            </div>
          )}

          {saleListing && saleListing.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent places for sale
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?type=sale"}
                >
                  Show more places for sale
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 py-4 px-4">
                {saleListing &&
                  saleListing.map((listing) => (
                    <Listings key={listing._id} listing={listing} />
                  ))}
              </div>
            </div>
          )}

          {/* {!loading && allListings && allListings.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 py-4 px-4">
              {allListings &&
                allListings.map((listing) => (
                  <Listings key={listing._id} listing={listing} />
                ))}
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};

export default Home;
