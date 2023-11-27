import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { FaShare, FaBed, FaBath, FaParking, FaChair } from "react-icons/fa";
import ImageSlider from "./ImageSlider";
import Contact from "./Contact";

const Listing = () => {
  const { id } = useParams();
  const { allListings } = useSelector((state) => state.listing);
  const { user } = useSelector((state) => state.user);
  const selectedListing = allListings.find((listing) => listing._id === id);

  const [fileExplore, setFileExplore] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [selecteImgIndex, setSelctedImgIndex] = useState(null);

  const handleImageClick = (index) => {
    setSelctedImgIndex(index);
  };

  return (
    <>
      {fileExplore && (
        <div>
          <div className="fixed top-0  w-screen h-screen bg-gray-200 p-4 animate-slide-up overflow-y-auto z-50">
            <button
              className="w-full text-end text-blue-950"
              onClick={() => {
                setSelctedImgIndex(null);
                setFileExplore(!fileExplore);
              }}
            >
              <span className="bg-white py-1 px-3 font-semibold rounded-full hover:shadow-md transition duration-300 fixed top-5 right-10 z-50">
                Close
              </span>
            </button>

            <ImageSlider
              images={selectedListing.imageURLs}
              index={selecteImgIndex}
            />
          </div>
        </div>
      )}

      <main className="mx-4 relative mt-20">
        <div className="max-w-3xl grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden relative">
          <div onClick={() => setFileExplore(!fileExplore)}>
            {selectedListing.imageURLs && (
              <img
                className="aspect-square cursor-pointer object-cover"
                src={selectedListing.imageURLs[0]}
                alt=""
                onClick={() => handleImageClick(0)}
              />
            )}
          </div>
          <div className="grid" onClick={() => setFileExplore(!fileExplore)}>
            {selectedListing.imageURLs && (
              <img
                className="aspect-square cursor-pointer object-cover"
                src={selectedListing.imageURLs[1]}
                alt=""
                onClick={() => handleImageClick(1)}
              />
            )}
            <div
              className="overflow-hidden"
              onClick={() => setFileExplore(!fileExplore)}
            >
              {selectedListing.imageURLs && (
                <img
                  className="aspect-square cursor-pointer object-cover relative top-2"
                  src={selectedListing.imageURLs[2]}
                  alt=""
                  onClick={() => handleImageClick(2)}
                />
              )}
            </div>
          </div>
          <button
            onClick={() => setFileExplore(!fileExplore)}
            className="absolute bottom-3 right-3 bg-white rounded-md py-1 px-3 flex items-center gap-2 text-xl hover:bg-gray-300 transition duration-200 cursor-pointer"
          >
            <img src="/ExpandIcon.svg" className="h-5" alt="" />
            <span className="font-semibold">Explore more</span>
          </button>

          <button
            className="absolute top-3 right-3 bg-white p-2 z-10 rounded-full"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              const timer = setTimeout(() => {
                setCopied(false);
              }, 2000);
              return () => setTimeout(timer);
            }}
          >
            <FaShare size={20} className="text-slate-500" />
          </button>

          {copied && (
            <p className="fixed top-[10%] right-[8%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
        </div>

        <h1 className="font-semibold text-3xl text-center pt-2">
          {selectedListing.name} - $
          {selectedListing.offer
            ? +selectedListing.regularPrice - +selectedListing.discountPrice
            : selectedListing.regularPrice}
          {selectedListing.type === "rent" && " / month"}
        </h1>

        <p className="flex justify-center items-center gap-2">
          <IoLocationOutline className="m-0" />
          {selectedListing.address}
        </p>

        <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
          <div className="flex gap-4">
            <p className="bg-red-900 px-4 text-white text-center p-1 rounded-md">
              {selectedListing.type === "rent" ? "For Rent" : "For Sale"}
            </p>
            {selectedListing.offer && (
              <p className="bg-green-900 px-4 text-white text-center p-1 rounded-md">
                $
                {+selectedListing.regularPrice - +selectedListing.discountPrice}{" "}
                -{" "}
                <strike className="font-light">
                  ${selectedListing.regularPrice}
                </strike>{" "}
                off ${selectedListing.discountPrice}
              </p>
            )}
          </div>
          {selectedListing.description.split("/n")}
          <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
            <li className="flex items-center gap-1 whitespace-nowrap ">
              <FaBed className="text-lg" />
              {selectedListing.bedrooms > 1
                ? `${selectedListing.bedrooms} beds `
                : `${selectedListing.bedrooms} bed `}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap ">
              <FaBath className="text-lg" />
              {selectedListing.bathrooms > 1
                ? `${selectedListing.bathrooms} baths `
                : `${selectedListing.bathrooms} bath `}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap ">
              <FaParking className="text-lg" />
              {selectedListing.parking ? "Parking spot" : "No Parking"}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap ">
              <FaChair className="text-lg" />
              {selectedListing.furnished ? "Furnished" : "Unfurnished"}
            </li>
          </ul>
          {!user && (
            <Link to="/sign-in">
              <button className="bg-black/70 hover:bg-black/80 text-white transition-colors duration-300 p-3 rounded-full text-md flex items-center justify-center uppercase mt-4">
                Log-in to contact
              </button>
            </Link>
          )}
          {user && selectedListing.userRef !== user._id && !contact && (
            <button
              onClick={() => setContact(true)}
              className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
            >
              Contact landlord
            </button>
          )}
          {contact && <Contact listing={selectedListing} />}
        </div>
      </main>
    </>
  );
};

export default Listing;
