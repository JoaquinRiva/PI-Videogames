import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogames, getAllGenres } from "../redux/actions";

function Home() {
    const dispatch = useDispatch();
    const videogames = useSelector(state => state.videogames);

    useEffect(() => {
        dispatch(getVideogames());
        dispatch(getAllGenres())
    }, [])
    console.log(videogames);


    return(
        <div>
            <SearchBar />
            
            <h1>home</h1>
            <div>
                {videogames.map((videogame) => {
                    return (
                        <Card
                        key={videogame.id}
                        id={videogame.id}
                        name={videogame.name}
                        image={videogame.image}
                        genres={videogame.genres}
                        />
                    );
                })}
       </div>
    </div>
    )
} 

export default Home;