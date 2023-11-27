import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { googleLogin } from "../app/user/userActions";

const OAuth = () => {
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = new getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const { displayName: username, email, photoURL } = result.user;

      dispatch(googleLogin({ username, email, photoURL }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="border border-slate-400 rounded-lg flex p-3 hover:shadow-md transition duration-150"
    >
      <div className="flex gap-4">
        <img
          className="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
        />
        <span className="uppercase font-semibold">Sign-in with Google</span>
      </div>
    </button>
  );
};

export default OAuth;
