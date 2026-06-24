import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useDebounce from "../../Hooks/useDebounce";
import "./index.scss";

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debounceSearch.trim()) {
      onSearch(debounceSearch);
    }
  }, [debounceSearch, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>TMDB</h2>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/upcoming">Upcoming</Link>
        <Link to="/popular">Popular</Link>
        <Link to="/about">About</Link>
      </div>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search Movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>
    </nav>
  );
};

export default Navbar;