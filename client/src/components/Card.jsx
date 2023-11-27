import { Link } from "react-router-dom";

function Card({id, name, description, platform, image, released, rating, genres}) {
    return(
        <div>
            <div>
                <img src={image} alt={name} />
                <h2>Name: {name}</h2>
                <p>id: {id}</p>
                <p>platform: {platform}</p>
                <p>released: {released}</p>
                <p>rating: {rating}</p>
                <p>description: {description}</p>
                <ul>
                    genres:
                  {genres.map((genre, index) => (
                 <li key={index}>{genre}</li>))}
                </ul>
                <Link to={`/detail/${id}`}>
                <button>Details of {name}</button>
                </Link>
            </div>
        </div>
    )
}




export default Card;