import { Link } from "react-router-dom";
import "./Card.css"
function Card({ id, name, image, genres }) {
  return (
    <div className="CardContenedor">
        <img className="img" src={image} alt={name} />
        <h2>Name: {name}</h2>
        <p>ID: {id}</p>
        <ul>
          Genres:
          {genres.map((genre, index) => (
            <p key={index}>{genre}</p>
          ))}
        </ul>
        <Link to={`/detail/${id}`}>
          <button>Details of {name}</button>
        </Link>
    </div>
  );
}

export default Card;
