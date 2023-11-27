import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import OAuth from "../../components/OAuth";
import { clearError, clearSuccessMessage } from "../../app/user/userSlice";
import { userLogin } from "../../app/user/userActions";
import { notify } from "../../common";

const Signin = () => {
  const {
    loading,
    error: err,
    user,
    successMessage,
  } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  // clear accout deletion success message and notify user
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 5000);

      return () => setTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    setError(err);
  }, [err]);

  useEffect(() => {
    if (err) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, err]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(formData));
  };

  if (user) {
    return <Navigate to="/" />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="p-3 max-w-lg mx-auto mt-10">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="example@gmail.com"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="mt-5">
        <p>
          Don't have an account?
          <Link to={"/sign-up"}>
            {" "}
            <span className="text-blue-700">Sign Up</span>
          </Link>
        </p>
      </div>
      {error && (
        <ErrorMessage
          setError={setError}
          error={error}
          visible={visible}
          setVisible={setVisible}
        />
      )}
    </div>
  );
};

export default Signin;
