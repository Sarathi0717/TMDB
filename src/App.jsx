import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Home from "./Pages/Home";
import Upcoming from "./Pages/Upcoming";
import PopularMovies from "./Pages/Popular";
import About from "./Pages/About";
import MovieDetails from "./Pages/MovieDetails";
import CastDetails from "./Pages/CastDetails";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import EditProfile from "./Pages/Editprofile";

import Navbar from "./UiLayout/Navbar";
import Footer from "./UiLayout/Footer";
import Pagination from "./Components/Pagination";
import Profile from './Pages/Profile';

import {
  fetchPopularMovies,
  fetchUpcomingMovies,
  searchMovies,
} from "./Services/Index";

// Protected Route
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user ? children : <Navigate to="/login" replace />;
};

function AppContent() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  const [data, setData] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPopularMovies(currentPage)
      .then((res) => setData(res))
      .catch(console.error);
  }, [currentPage]);

  useEffect(() => {
    fetchUpcomingMovies(currentPage)
      .then((res) => setUpcoming(res))
      .catch(console.error);
  }, [currentPage]);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      fetchPopularMovies(currentPage).then(setData);
      return;
    }

    try {
      const result = await searchMovies(query);
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="App">
      {!hideLayout && <Navbar onSearch={handleSearch} />}

      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            localStorage.getItem("user") ? (
              <Navigate to="/" replace />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/signup"
          element={
            localStorage.getItem("user") ? (
              <Navigate to="/" replace />
            ) : (
              <Signup />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Home data={data} />
                <Pagination
                  currentPage={currentPage}
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/popular"
          element={
            <ProtectedRoute>
              <>
                <PopularMovies data={data} />
                <Pagination
                  currentPage={currentPage}
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/upcoming"
          element={
            <ProtectedRoute>
              <>
                <Upcoming upcoming={upcoming} />
                <Pagination
                  currentPage={currentPage}
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="/movie/:id"
          element={
            <ProtectedRoute>
              <MovieDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/person/:id"
          element={
            <ProtectedRoute>
              <CastDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}