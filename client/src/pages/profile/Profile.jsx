import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { deleteUser, updateUser, userLogOut } from "../../app/user/userActions";
import { clearError } from "../../app/user/userSlice";
import { notify } from "../../common";
import { getMyListings } from "../../app/listing/listingActions";

import Listings from "../Listing/Listings";
import Loading from "../../components/Loading";

const Profile = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadedMessage, setFileUploadedMessage] = useState("");
  const [fileUploadError, setFileUploadError] = useState(false);

  const { user, loading, error } = useSelector((state) => state.user);
  const { myListings, loading: listingLoading } = useSelector(
    (state) => state.listing
  );

  // clear listing update state to false after succesfully updated
  useEffect(() => {}, []);

  // fetch my listing if has
  useEffect(() => {
    dispatch(getMyListings());
  }, []);

  // clear error and notify user
  useEffect(() => {
    if (error) {
      notify("error", error);
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // check error occruring while uplading a file
  useEffect(() => {
    if (fileUploadError) {
      const timer = setTimeout(() => {
        setFileUploadError(false);
        setFile(undefined);
        setFilePerc(0);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [fileUploadError]);

  // display successful message after uploadng image progress is 100%
  useEffect(() => {
    if (filePerc === 100) {
      setFileUploadedMessage("Image successfully uploaded!");
    }

    const timer = setTimeout(() => {
      setFileUploadedMessage("");
    }, 5000);

    return () => setTimeout(timer);
  }, [filePerc]);

  // handle file upload
  useEffect(() => {
    // firebase storage
    // allow read;
    // allow write: if
    // request.resource.size < 2 * 1024 * 1024 &&
    // request.resource.contentType.matches('image/.*')
    if (file) handleFileUpload(file);
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const obj = {
      formData,
      id: user._id,
    };

    dispatch(updateUser(obj));
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(user._id));
  };

  const handleSignOut = () => {
    dispatch(userLogOut());
  };

  return (
    <div className="">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <div className="p-3 max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData?.avatar || user?.avatar}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          />
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 && !fileUploadError ? (
              <span className="text-green-700">
                {!fileUploadError &&
                  fileUploadedMessage.trim() !== "" &&
                  fileUploadedMessage}
              </span>
            ) : (
              ""
            )}
          </p>
          <input
            type="text"
            placeholder="username"
            defaultValue={user?.username}
            id="username"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="example@gmail.com"
            id="email"
            defaultValue={user?.email}
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            onChange={handleChange}
            id="password"
            className="border p-3 rounded-lg"
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Update"}
          </button>
          <Link
            className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95 w-full"
            to={"/create-listing"}
          >
            Create Listing
          </Link>
        </form>

        <div className="flex justify-between mt-5">
          <span
            onClick={handleDeleteUser}
            className="text-red-700 cursor-pointer m-0"
          >
            Delete account
          </span>
          <span
            onClick={handleSignOut}
            className="text-red-700 cursor-pointer m-0"
          >
            Sign out
          </span>
        </div>
      </div>

      <div className="max-w-4xl">
        <h1 className="text-center mt-7 text-2xl font-semibold">
          Your Listings
        </h1>

        {listingLoading ? (
          <Loading />
        ) : !listingLoading && myListings && myListings.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 py-4 px-4">
            {myListings &&
              myListings.map((listing) => (
                <Listings key={listing._id} listing={listing} />
              ))}
          </div>
        ) : (
          <div className="text center">You dont have listings, please add.</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
