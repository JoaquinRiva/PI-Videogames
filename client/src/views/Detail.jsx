import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <div>
        <h2>ID: {videogames.id}</h2>
        <img src={videogames.image} alt={videogames.name} />
      </div>
      <h2>NAME: {videogames.name}</h2>
      <h2>description: {videogames.description}</h2>
      <h2>platform: {videogames.platform}</h2>
      <h2>released: {videogames.released}</h2>
      <h2>genres: {videogames.genres}</h2>
    </div>
  );
}

export default Detail;
