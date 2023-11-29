import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Detail.css"

function Detail() {
  const { id } = useParams();
  const [videogames, setVideogames] = useState({});

  useEffect(() => {
    axios(`http://localhost:3001/videogames/${id}`)
    .then(({data})=>{
      console.log(data)
      if(data.name){
          setVideogames(data)
      } else {
          window.alert("0")
      }
  })
  return setVideogames({})
}, [id])

  return (
    <div className="detailContenedor">
      <Link to="/home">
        <button className="buttonHome">Home</button>
      </Link>
      <div>
        <h2>ID: {videogames.id}</h2>
        <img className="imgDetail" src={videogames.image} alt={videogames.name} />
      </div>
      <h2>{videogames.name}</h2>
      <h2>Description: {videogames.description}</h2>
      <h2>Platforms: {videogames.platform}</h2>
      <h2>Released: {videogames.released}</h2>
      <h2>genres: {videogames.genres}</h2>
      <h2>Rating: {videogames.rating}</h2>
    </div>
  );
}

export default Detail;
