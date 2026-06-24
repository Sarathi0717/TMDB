import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../../Services/Index';

import './index.scss';

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const[trailer,setTrailer] = useState("");
    const formatDate = (date) => {
    return date.split("-").reverse().join("-");
  };

  useEffect(() => {
    fetchMovieDetails(id)
      .then((res) => setMovie(res))
      .catch((err) => console.log(err));
  }, [id]);

  if (!movie) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="movie-details">
      <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title}/>

      <div className="movie-info">
        <h1>{movie.title}</h1>
        <p>
          Release Date: {formatDate(movie.release_date)}
        </p>

        <p>
          <strong>Rating:</strong>
          {' '}
          {movie.vote_average}
        </p>
        <p>
          <strong>Overview:</strong>
        </p>
        <p>{movie.overview}</p>
        <a href={trailer}target='_blank' rel='noopener noreferrer'>
          <button className='trailer'> watch Trailer</button>
        </a>
      </div>
    </div>
  );
}

export default MovieDetails;