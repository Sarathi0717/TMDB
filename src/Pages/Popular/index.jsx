import React from 'react';
import {
  Card,
  CardTitle,
  CardImage,
  CardDescription
} from '../../Components/Cards';

import './index.scss';

const PopularMovies = ({ data }) => {
  return (
    <div className="PopularMovies">
      <h1>Popular Movies</h1>

      <div className="Card-mainContainer">
        {data.map((item) => {
          return (
            <Card key={item.id}>
              <CardImage
                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
              />

              <CardTitle
                title={item.original_title}
              />

              <CardDescription
                description={item.overview.slice(0, 100)}
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PopularMovies;