import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { TiThMenuOutline } from "react-icons/ti";
import { useSelector } from "react-redux";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [scrollingChanges, setScrollingChanges] = useState("transparent");

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const listenScrollEvent = () => {
    setScrollingChanges(
      window.scrollY > 10 ? "shadow-md bg-slate-200" : "transparent"
    );
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim() === "") return;

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();

    return navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header
      className={`bg-slate-100  flex justify-between items-center mx-auto fixed top-0 w-full ${scrollingChanges} py-2 transition duration-300 z-50`}
    >
      {/* logo */}
      <Link to="/">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Estate</span>
          <span className="text-slate-700">Explorer</span>
        </h1>
      </Link>

      {/* seacch bar */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-100 border border-slate-200 focus-within:border-slate-400 transition-[0.5s] p-3 rounded-full flex items-center"
      >
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>
          <FaSearch className="text-slate-600" />
        </button>
      </form>

      {/* navigation links */}
      <div>
        <TiThMenuOutline
          className={`inline sm:hidden cursor-pointer`}
          onClick={() => setIsOpen(!isOpen)}
        />

        <div className="gap-4 rounded-lg hidden sm:inline-flex">
          <Link
            to="/"
            className="text-slate-700 hover:underline"
            onClick={() => setIsOpen(!isOpen)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-slate-700 hover:underline"
            onClick={() => setIsOpen(!isOpen)}
          >
            About
          </Link>
          <Link to="/profile" className="text-slate-700 hover:underline">
            {user ? (
              <div className="flex gap-2">
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={user.avatar}
                  alt="profile"
                />
                <p onClick={() => setIsOpen(!isOpen)}>{user.username}</p>
              </div>
            ) : (
              <p onClick={() => setIsOpen(!isOpen)}>Sign in</p>
            )}
          </Link>
        </div>

        {isOpen && (
          <div className="sm:hidden flex flex-col absolute right-[60px] bg-white p-4 shadow-md gap-3 rounded-lg">
            <Link
              to="/"
              className="text-slate-700 hover:underline"
              onClick={() => setIsOpen(!isOpen)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-slate-700 hover:underline"
              onClick={() => setIsOpen(!isOpen)}
            >
              About
            </Link>
            <Link to="/profile" className="text-slate-700 hover:underline">
              {user ? (
                <div className="flex gap-2 justify-start">
                  <img
                    className="rounded-full h-7 w-7 object-cover"
                    src={user.avatar}
                    alt="profile"
                  />
                  <p onClick={() => setIsOpen(!isOpen)}>{user.username}</p>
                </div>
              ) : (
                <p onClick={() => setIsOpen(!isOpen)}>Sign in</p>
              )}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
