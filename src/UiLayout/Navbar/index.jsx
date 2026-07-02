import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../Services/FireBase";
import useDebounce from "../../Hooks/useDebounce";
import "./index.scss";

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const debounceSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debounceSearch.trim()) {
      onSearch(debounceSearch);
    }
  }, [debounceSearch, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    onSearch(searchTerm);

    navigate("/");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);

      localStorage.removeItem("user");

      navigate("/login", { replace: true });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <h2>TMDB</h2>
        </Link>
      </div>

      {/* Navigation */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/popular">Popular</Link>
        <Link to="/upcoming">Upcoming</Link>
        <Link to="/about">About</Link>
      </div>

      {/* Search */}
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search Movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button type="submit">
          Search
        </button>
      </form>

      {/* User */}
      {user && (
  <div className="profile-menu">
    <img
      src={
        user.photo ||
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      }
      alt={user.name}
      className="profile-img"
    />

    <div className="user-details">
      <span className="user-name">
        {user.name}
      </span>

      <div className="actions">
        <Link to="/profile">
          Profile
        </Link>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  </div>
)}
    </nav>
  );
};

export default Navbar;