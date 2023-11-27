import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { MdOutlineCloudUpload, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { app } from "../../firebase";
import { notify } from "../../common";
import { createListing, editListing } from "../../app/listing/listingActions";
import { clearNewLising } from "../../app/listing/listingSlice";

const ListingForm = () => {
  const { id } = useParams();
  const { newListing, error, loading, myListings, isListingUpdated } =
    useSelector((state) => state.listing);
  const selectedListing = myListings.find((listing) => listing._id === id);

  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: selectedListing ? selectedListing.name : "",
    description: selectedListing ? selectedListing.description : "",
    address: selectedListing ? selectedListing.address : "",
    regularPrice: selectedListing ? selectedListing.regularPrice : 0,
    discountPrice: selectedListing ? selectedListing.discountPrice : 0,
    bathrooms: selectedListing ? selectedListing.bathrooms : 1,
    bedrooms: selectedListing ? selectedListing.bedrooms : 1,
    furnished: selectedListing ? selectedListing.furnished : false,
    parking: selectedListing ? selectedListing.parking : false,
    type: selectedListing ? selectedListing.type : "rent",
    offer: selectedListing ? selectedListing.offer : false,
    imageURLs: selectedListing ? selectedListing.imageURLs : [],
  });
  const dispatch = useDispatch();

  if (error) notify("error", error);

  // resetting state
  useEffect(() => {
    if (newListing && !error) {
      const timer = setTimeout(() => {
        dispatch(clearNewLising());
      }, 2000);

      return () => setTimeout(timer);
    }
  }, [newListing, error]);

  // navigate to profile page if listing added successfully
  if (newListing && !error) {
    notify("success", "Listing add successfully!");
    return <Navigate to="/profile" />;
  }

  // navigate to profile page if listing updated successfully
  if (isListingUpdated && !error) {
    notify("success", "Listing updated successfully!");
    return <Navigate to="/profile" />;
  }

  const handleImagesSubmit = (e) => {
    if (e.target.files.length > 0 && e.target.files.length < 7) {
      setUploading(true);
      const promises = [];

      for (let i = 0; i < e.target.files.length; i++) {
        promises.push(storeImage(e.target.files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageURLs: formData.imageURLs.concat(urls),
          });
          setUploading(false);
        })
        .catch((err) => {
          if (err) {
            setUploading(false);
            notify("error", "Image upload failed (max image size 2MB)");
          }
        });
    } else {
      notify("error", "Can't upload more that 6 images!");
    }
  };

  // storing images in firebase
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setUploading(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleImageRemove = (fileUrl) => {
    deleteFirebaseFile(fileUrl);

    setFormData({
      ...formData,
      imageURLs: formData.imageURLs.filter((url) => url !== fileUrl),
    });
  };

  // delete file in firebase when click remove button
  const deleteFirebaseFile = (url) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, url);

    deleteObject(storageRef)
      .then(() => {
        notify("success", "Image deleted successfully!");
      })
      .catch((error) => {
        notify("error", error.message);
      });
  };

  const handleChange = (e) => {
    if (e.target.id == "sale" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (id) {
      dispatch(editListing({ formData, id }));
    } else {
      dispatch(createListing(formData));
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Listing</h1>

      <form className="max-w-2xl mx-auto px-2" onSubmit={handleSubmitForm}>
        <div className="w-full flex flex-col gap-4">
          <input
            type="text"
            className="border p-3 rounded-lg w-full"
            id="name"
            placeholder="Name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            className="border p-3 rounded-lg w-full"
            id="description"
            placeholder="Description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            className="border p-3 rounded-lg w-full"
            id="address"
            placeholder="Address"
            required
            onChange={handleChange}
            value={formData.address}
          />
        </div>

        <div className="py-4 grid grid-cols-2">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 m-0">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span className="m-0">Sell</span>
            </div>
            <div className="flex gap-2 m-0">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span className="m-0">Rent</span>
            </div>
            <div className="flex gap-2 m-0">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span className="m-0">Parking spot</span>
            </div>
            <div className="flex gap-2 m-0">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span className="m-0">Furnished</span>
            </div>
            <div className="flex gap-2 m-0">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span className="m-0">Offer</span>
            </div>
          </div>

          <div className="h-full flex flex-col gap-2">
            <div className="flex gap-4">
              <div className="flex items-center gap-2 m-0">
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
                <p>Beds</p>
              </div>
              <div className="flex items-center gap-2 m-0">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <p>Baths</p>
              </div>
            </div>
            <div className="flex items-center gap-2 m-0">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="m-0">
                <p>Regular price</p>
                {formData.type === "rent" && (
                  <span className="text-xs">($ / month)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2 m-0">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="m-0">
                  <p>Discounted price</p>

                  {formData.type === "rent" && (
                    <span className="text-xs">($ / month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="font-semibold text-center my-4">
          Images:
          <span className="font-normal text-gray-600 ml-2">
            The first image will be the cover (max 6)
          </span>
        </p>
        <div className="grid grid-cols-3 gap-2">
          {formData.imageURLs.length > 0 &&
            formData.imageURLs.map((url) => (
              <div key={url} className="relative w-full">
                <img
                  src={url}
                  className="h-32 w-full rounded-2xl object-cover"
                  alt=""
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(url)}
                  className="absolute bottom-1 right-1  bg-red-600 rounded-full p-1 transition duration-300 hover:bg-white group"
                >
                  <MdDelete
                    size={30}
                    className="text-white group-hover:text-red-600"
                  />
                </button>
              </div>
            ))}
          <label className="h-32 cursor-pointer flex flex-col w-full items-center gap-1 justify-center border border-gray-400 rounded-2xl p-2 text-2xl text-gray-600 bg-white">
            <input
              type="file"
              multiple
              className="hidden"
              accept="image/*"
              id="images"
              onChange={handleImagesSubmit}
            />
            <MdOutlineCloudUpload size={35} />
            {uploading ? "Uploading..." : "Upload"}
          </label>
        </div>
        <button
          disabled={loading || uploading}
          className="p-3 my-4 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-full"
        >
          {loading ? "Creating..." : "Create listing"}
        </button>
      </form>
    </main>
  );
};

export default ListingForm;
