import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from "../redux/actions";
import Filters from "./Filters";
import { Link } from "react-router-dom";
import "./SearchBar.css"

export default function SearchBar() {
  const [name, setName] = useState("");
  const [error, setError] = useState(""); 
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (name.trim() === "") {
      setError("Ingrese un nombre"); 
      return;
    }
    dispatch(getVideogamesByName(name));
    setError(""); 
  };

  return (
    <div>
      <Filters />
      <Link to={"/Form"}>
        <button className="buttonCrear">Crea tu Videojuego</button>
      </Link>
     <div className="divBuscar">
       <input
        type="search"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
          setError(""); 
        }}
        placeholder="Buscar Juego"
      />
      
        <button className="buttonSearchVg"  onClick={handleSearch}>
          Buscar
        </button>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>} 
      
    </div>
  );
}
