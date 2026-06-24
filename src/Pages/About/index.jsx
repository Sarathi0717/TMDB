import React from 'react';
import './index.scss';

const About = () => {
  return (
    <div className="About">
      <h1>About TMDB Movies</h1>

      <p>
        TMDB Movies is a React-based movie application that uses
        The Movie Database (TMDB) API to display popular and
        upcoming movies.
      </p>

      <p>
        Features included:
      </p>

      <ul>
        <li>Popular Movies</li>
        <li>Upcoming Movies</li>
        <li>Movie Search</li>
        <li>Pagination</li>
      
      </ul>

      <p>
        Developed by <strong>SARATHI M</strong>.
      </p>
    </div>
  );
};

export default About;