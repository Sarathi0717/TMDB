import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieTrailer,fetchMovieCast } from '../../Services/Index';
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

  useEffect (()=>{
    fetchMovieCast(id)
    .then((res)=>{
      setCast(res.slice(0,10));
    })
  .catch((err)=> console.log(err));
  },[id]);

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

         <div className='cast-section'>
          <h1>CAST</h1>
          <div className='cast-container'>
            {cast.map((actor)=>(
              <div key={actor.id} clasaName="cast-card" >
                <img src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`  : 'https://via.placeholder.com/200x300?text=No+Image'} alt={actor.name} />
                <h3> {actor.name} </h3>
                <p> {actor.character} </p>
              </div>
            ))}
          </div>

         </div>
      </div>
    </div>

  );
};

export default MovieDetails;