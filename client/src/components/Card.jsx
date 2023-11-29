import { Link } from "react-router-dom";
import "./Card.css"
function Card({ id, name, image, genres }) {
  return (
    <div className="CardContenedor">
        <img className="img" src={image} alt={name} />
        <h2>{name}</h2>
        <p className="pCard">ID: {id}</p>
        <p className="ulCard">
          Genres:
          {genres.map((genre, index) => (
            <p key={index}>{genre}</p>
          ))}
        </p>
        <Link to={`/detail/${id}`}>
          <button className="buttonDetail">Details of {name}</button>
        </Link>
    </div>
  );
}

export default Card;
