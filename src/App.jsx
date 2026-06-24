import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Upcoming from './Pages/Upcoming';
import PopularMovies from './Pages/Popular';
import Navbar from './UiLayout/Navbar';
import Footer from './UiLayout/Footer';
import Pagination from './Components/Pagination';
import About from './Pages/About';
import MovieDetails from './Pages/MovieDetails';

import {fetchPopularMovies,fetchUpcomingMovies,searchMovies} from './Services';

const App = () => {
  const [data, setData] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {fetchPopularMovies(currentPage).then((res) => setData(res)).catch((err) => console.log(err)); }, [currentPage]);

  useEffect(() => {
    fetchUpcomingMovies(currentPage)
      .then((res) => setUpcoming(res))
      .catch((err) => console.log(err));
  }, [currentPage]);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      fetchPopularMovies(currentPage)
        .then((res) => setData(res));
      return;
    }

    try {
      const result = await searchMovies(query);
      setData(result);
    } catch (error) {
      console.log(error);
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
    <BrowserRouter>
      <div className="App">
        <Navbar onSearch={handleSearch} /> <Routes>

          <Route path="/" element={<><Home data={data} />
                <Pagination
                  currentPage={currentPage}
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                />
              </>
            }
          />

          <Route path="/popular"element={ <> <PopularMovies data={data} />

                <Pagination
                  currentPage={currentPage}
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                />
              </>
            }
          />

          <Route
            path="/upcoming"
            element={
              <>
                <Upcoming upcoming={upcoming} />

                <Pagination
                  currentPage={currentPage}
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                />
              </> 
            }/>
          <Route path="/about" element={<About />}/>
          <Route path="/movie/:id" element={<MovieDetails />}/>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;