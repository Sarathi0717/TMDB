import './index.scss';

export const Card = ({ children, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      {children}
    </div>
  );
};

export const CardImage = ({ src }) => {
  return (
    <div className="card-image">
      <img src={src} alt="movie" />
    </div>
  );
};

export const CardTitle = ({ title }) => {
  return (
    <div className="card-title">
      <h3>{title}</h3>
    </div>
  );
};

export const CardDescription = ({ description }) => {
  return (
    <div className="card-description">
      <p>{description}</p>
    </div>
  );
};