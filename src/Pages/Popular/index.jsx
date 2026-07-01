import React from "react";
import {
  Card,
  CardTitle,
  CardImage,
  CardDescription,
} from "../../Components/Cards";
import { useNavigate } from "react-router-dom";

import "./index.scss";

const PopularMovies = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="PopularMovies">
      <h1>Popular Movies</h1>

      <div className="Card-mainContainer">
        {data && data.length > 0 ? (
          data.map((item) => (
            <Card
              key={item.id}
              onClick={() => navigate(`/movie/${item.id}`)}
            >
              <CardImage
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
              />

              <CardTitle
                title={item.title || item.original_title}
              />

              <CardDescription
                description={
                  item.overview
                    ? item.overview.slice(0, 100) + "..."
                    : "No description available."
                }
              />
            </Card>
          ))
        ) : (
          <h2 className="no-movie">No Popular Movies Available</h2>
        )}
      </div>
    </div>
  );
};

export default PopularMovies;