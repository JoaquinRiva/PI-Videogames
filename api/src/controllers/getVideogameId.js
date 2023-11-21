const { Videogames, Genres } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

async function getVideogameId(req, res) {
    try {
        const { idVideogame } = req.params;

        const apiResponse = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
        const apiVideogame = apiResponse.data;

        if (apiVideogame) {
            const videogame = {
                id: apiVideogame.id,
                name: apiVideogame.name,
                description: apiVideogame.description,
                platform: apiVideogame.platform,
                image: apiVideogame.background_image,
                released: apiVideogame.released,
                rating: apiVideogame.rating,
                genres: apiVideogame.genres.map(genre => genre.name), 
            };
            return res.status(200).json(videogame);
        }

        const dbVideogame = await Videogames.findByPk(idVideogame, {
            include: Genres,
        });

        if (dbVideogame) {
            const videogame = {
                id: dbVideogame.id,
                name: dbVideogame.name,
                description: dbVideogame.description,
                platform: dbVideogame.platform,
                image: dbVideogame.background_image,
                released: dbVideogame.released,
                rating: dbVideogame.rating,
                genres: dbVideogame.Genres.map(genre => genre.name), 
            };
            return res.status(200).json(videogame);
        }

        res.status(404).json({ error: "Videojuego no encontrado" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener datos de videojuegos" });
    }
}

module.exports = getVideogameId;
