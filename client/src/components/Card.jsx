import { Link } from "react-router-dom";

function Card({ id, name, image, genres }) {
  return (
    <div>
      <div>
        <img src={image} alt={name} />
        <h2>Name: {name}</h2>
        <p>ID: {id}</p>
        <ul>
          Genres:
          {genres.map((genre, index) => (
            <li key={index}>{genre}</li>
          ))}
        </ul>
        <Link to={`/detail/${id}`}>
          <button>Details of {name}</button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
