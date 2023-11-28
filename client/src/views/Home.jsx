import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogames, getAllGenres } from "../redux/actions";
import { Paginacion } from "../components/Paginacion";
import "./Home.css"

function Home() {
    const dispatch = useDispatch();
    const videogames = useSelector(state => state.videogames);
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(15);
    const maximo = videogames.length / porPagina

    useEffect(() => {
        dispatch(getVideogames());
        dispatch(getAllGenres())
    }, [])
    console.log(videogames);


    return(
        <div>
            <h1>CIBER-GAME</h1>
            <SearchBar />
            <br />
            <br />
            <br />
            
            <div className="divCards">
            {videogames
  .slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
  .map((videogame) => {
    
    let genres = [];
    if (videogame.genres) {
      
      genres = videogame.genres.map(genre => {
        if (typeof genre === 'string') {
          return genre; 
        } else {
          return genre.name; 
        }
      });
    }
    
    return (
      <Card
        key={videogame.id}
        id={videogame.id}
        name={videogame.name}
        image={videogame.image}
        genres={genres}
      />
    );
  })}

       </div>
       <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo}/>

    </div>
    )
} 

export default Home;