import React from "react";
import {
  Card,
  CardTitle,
  CardImage,
  CardDescription,
} from "../../Components/Cards";

import { useNavigate } from "react-router-dom";
import "./index.scss";

const Upcoming = ({ upcoming }) => {
  const navigate = useNavigate();

  return (
    <div className="Upcoming">
      <h1>Upcoming Movies</h1>

      <div className="Card-mainContainer">
        {upcoming && upcoming.length > 0 ? (
          upcoming.map((item) => (
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
                    : "No description available"
                }
              />
            </Card>
          ))
        ) : (
          <h2 className="no-movie">No Upcoming Movies Available</h2>
        )}
      </div>
    </div>
  );
};

export default Upcoming;