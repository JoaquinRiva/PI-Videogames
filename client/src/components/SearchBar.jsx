import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from "../redux/actions";

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
      <input
        type="search"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
          setError(""); 
        }}
        placeholder="Buscar Juego"
      />
      <div>
        <button  onClick={handleSearch}>
          Buscar
        </button>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>} 
    </div>
  );
}
