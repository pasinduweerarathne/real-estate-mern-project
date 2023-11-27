import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userSignup } from "./services";
import ErrorMessage from "../../components/ErrorMessage";
import OAuth from "../../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await userSignup(formData);
      if (data) {
        setLoading(false);
        navigate("/sign-in");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="p-3 max-w-lg mx-auto mt-10">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
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
          Have an account?
          <Link to={"/sign-in"}>
            {" "}
            <span className="text-blue-700">Sign in</span>
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

export default SignUp;
