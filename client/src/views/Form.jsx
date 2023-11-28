import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import ValidacionForm from "../components/ValidacionForm";
import { getAllGenres } from "../redux/actions";

function Form() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.allGenres);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    platform: "",
    background_image: "",
    released: "",
    rating: 0,
    genres: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox"
        ? checked
          ? [...prevData.genres, value]
          : prevData.genres.filter((genre) => genre !== value)
        : value,
    }));

    setErrors(
      ValidacionForm({
        ...formData,
        [name]: type === "checkbox"
          ? checked
            ? [...formData.genres, value]
            : formData.genres.filter((genre) => genre !== value)
          : value,
      })
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/videogames", {
        name: formData.name,
        description: formData.description,
        platform: formData.platform,
        background_image: formData.background_image,
        released: formData.released,
        rating: formData.rating,
        genres: formData.genres,
      });

      console.log("Respuesta del backend:", response.data);

      
      navigate(`/detail/${response.data.id}`); 
    } catch (error) {
      console.error("Error al crear el videojuego:", error);
      
    }
  };

  const allowSubmission = !Object.values(errors).some(Boolean);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nombre:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} />
      {errors.name && <p>{errors.name}</p>}

      <label htmlFor="description">Descripción:</label>
      <input type="text" name="description" value={formData.description} onChange={handleChange} />
      {errors.description && <p>{errors.description}</p>}

      <label htmlFor="platform">Plataforma:</label>
      <input type="text" name="platform" value={formData.platform} onChange={handleChange} />
      {errors.platform && <p>{errors.platform}</p>}

      <label htmlFor="background_image">URL Imagen:</label>
      <input type="text" name="background_image" value={formData.background_image} onChange={handleChange} />
      {errors.background_image && <p>{errors.background_image}</p>}

      <label htmlFor="released">Fecha de Lanzamiento:</label>
      <input type="text" name="released" value={formData.released} onChange={handleChange} />
      {errors.released && <p>{errors.released}</p>}

      <label htmlFor="rating">Rating:</label>
      <input type="number" name="rating" value={formData.rating} onChange={handleChange} />
      {errors.rating && <p>{errors.rating}</p>}

      <div>
        {genres.map((genre, index) => (
          <label key={index}>
            <input
              type="checkbox"
              name="genres"
              value={genre}
              checked={formData.genres.includes(genre)}
              onChange={handleChange}
            />
            {genre}
          </label>
        ))}
      </div>

      <button type="submit" disabled={!allowSubmission}>
        Crear Videojuego
      </button>
    </form>
  );
}

export default Form;
