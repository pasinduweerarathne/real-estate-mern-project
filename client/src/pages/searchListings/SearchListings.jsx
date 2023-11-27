import React, { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { getAllListings } from "../../app/listing/listingActions";
import { useDispatch, useSelector } from "react-redux";
import Listings from "../Listing/Listings";
import Loading from "../../components/Loading";

const SearchListings = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const [filteringData, setFilteringData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const { allListings, loading } = useSelector((state) => state.listing);

  useEffect(() => {
    if (search) {
      dispatch(getAllListings(search));
    }
  }, [search, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", filteringData.searchTerm);
    urlParams.set("type", filteringData.type);
    urlParams.set("parking", filteringData.parking);
    urlParams.set("furnished", filteringData.furnished);
    urlParams.set("offer", filteringData.offer);
    urlParams.set("sort", filteringData.sort);
    urlParams.set("order", filteringData.order);
    const searchQuery = urlParams.toString();

    dispatch(getAllListings(`?${searchQuery}`));
  };

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    )
      setFilteringData({ ...filteringData, type: e.target.id });

    if (e.target.id === "searchTerm")
      setFilteringData({ ...filteringData, searchTerm: e.target.value });

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    )
      setFilteringData({ ...filteringData, [e.target.id]: e.target.checked });

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";

      setFilteringData({ ...filteringData, sort, order });
    }
  };

  return (
    <div className="mt-20 px-2">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
        <div className="w-full max-w-3xl">
          <input
            type="text"
            id="searchTerm"
            placeholder="Search..."
            className="border rounded-lg p-3 w-[70%]"
            value={filteringData.searchTerm}
            onChange={handleChange}
          />

          <select
            onChange={handleChange}
            defaultValue={"created_at_desc"}
            id="sort_order"
            className="border rounded-lg p-3 w-[30%]"
          >
            <option value="regularPrice_desc">Price high to low</option>
            <option value="regularPrice_asc">Price low to hight</option>
            <option value="createdAt_desc">Latest</option>
            <option value="createdAt_asc">Oldest</option>
          </select>
        </div>

        <div className="flex items-center justify-center gap-2 max-w-md">
          <label className="font-semibold">Type:</label>
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="all"
              className="w-5"
              onChange={handleChange}
              checked={filteringData.type === "all"}
            />
            <span>Rent & Sale</span>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="rent"
              className="w-5"
              onChange={handleChange}
              checked={filteringData.type === "rent"}
            />
            <span>Rent</span>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="sale"
              className="w-5"
              onChange={handleChange}
              checked={filteringData.type === "sale"}
            />
            <span>Sale</span>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="offer"
              className="w-5"
              onChange={handleChange}
              checked={filteringData.offer}
            />
            <span>Offer</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 w-[15%]">
          <label className="font-semibold">Amenities:</label>
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="parking"
              className="w-5"
              onChange={handleChange}
              checked={filteringData.parking}
            />
            <span>Parking</span>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="furnished"
              className="w-5"
              onChange={handleChange}
              checked={filteringData.furnished}
            />
            <span>Furnished</span>
          </div>
        </div>

        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 w-40 mx-auto">
          Search
        </button>
      </form>

      {loading ? (
        <Loading />
      ) : !loading && allListings && allListings.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 py-4 px-4">
          {allListings &&
            allListings.map((listing) => (
              <Listings key={listing._id} listing={listing} />
            ))}
        </div>
      ) : (
        <div className="text-red-600 text-lg text-center mt-5 font-bold">
          No listing found!
        </div>
      )}
    </div>
  );
};

export default SearchListings;
