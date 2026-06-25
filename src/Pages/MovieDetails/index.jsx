import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieTrailer } from '../../Services/Index';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';

import './index.scss';

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState('');
  const [showTrailer, setShowTrailer] = useState(false);
  const [cast, setCast] = useState([]);

  const formatDate = (date) => {
    return date.split('-').reverse().join('-');
  };

  useEffect(() => {
    fetchMovieDetails(id)
      .then((res) => setMovie(res))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    fetchMovieTrailer(id)
      .then((videos) => {
        console.log(videos);

        const trailer = videos.find(
          (video) =>
            video.type === 'Trailer' &&
            video.site === 'YouTube'
        );

        console.log(trailer);

        if (trailer) {
          setVideoKey(trailer.key);
          console.log(trailer.key);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!movie) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="movie-details">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={movie.title}
      />

      <div className="movie-info">
        <h1>{movie.title}</h1>

        <p>
          Release Date: {formatDate(movie.release_date)}
        </p>

        <p>
          <strong>Rating:</strong> {movie.vote_average}
        </p>

        <p>
          <strong>Overview:</strong>
        </p>

        <p>{movie.overview}</p>

        <button
          className="trailer-button"
          onClick={() => setShowTrailer(!showTrailer)}
        >
          {showTrailer ? 'Hide Trailer' : 'Watch Trailer'}
        </button>

        {showTrailer && videoKey && (
          <div className="youtube-player">
            <h2>Official Trailer</h2>

            <YouTube
              videoId={videoKey}
              opts={{
                width: '100%',
                height: '400',
                playerVars: {
                  autoplay: 1,
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;