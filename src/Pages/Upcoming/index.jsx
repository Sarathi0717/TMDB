import React from "react";
import {Card,CardTitle,CardImage,CardDescription,} from "../../Components/Cards";

import "./index.scss";

const Upcoming = ({ upcoming }) => {
  return (
    <div className="Upcoming">
      <h1>Upcoming Movies</h1>

      <div className="Card-mainContainer">
        {upcoming.map((item) => (
          <Card key={item.id}>
            <CardImage
              src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
            />

            <CardTitle title={item.original_title} />

            <CardDescription
              description={item.overview.slice(0, 100)}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Upcoming;