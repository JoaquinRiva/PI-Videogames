const axios = require('axios');
const { Genres } = require('../db'); 
const { API_KEY } = process.env;


const getGenres = async (req, res) => {
  try {
    const genresInDB = await Genres.findAll();

    if (genresInDB.length === 0) {
      const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`); 

      if (response.status === 200) {
        const genresFromAPI = response.data.results;

        const savedGenres = await Promise.all(genresFromAPI.map(async (genre) => {
          const createdGenre = await Genres.create({
            name: genre.name,
           
          });
          return createdGenre;
        }));

        return res.json(savedGenres);
      } else {
        return res.status(response.status).json({ error: 'Error al obtener datos de géneros' });
      }
    } else {
      return res.json(genresInDB);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener datos de géneros' });
  }
};

module.exports = getGenres;
