const { Videogames, Genres } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;
const { Op } = require("sequelize");

async function getVideogameName(req, res) {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ error: "El parámetro 'name' es requerido" });
        }

        const apiResponse = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
        const apiVideogames = apiResponse.data.results;

        if (apiVideogames && apiVideogames.length > 0) {
            const videogameFromApi = apiVideogames.map(apiVideogame => ({
                id: apiVideogame.id,
                name: apiVideogame.name,
                description: apiVideogame.description,
                platform: apiVideogame.platform,
                image: apiVideogame.background_image,
                released: apiVideogame.released,
                rating: apiVideogame.rating,
                genres: apiVideogame.genres.map(genre => genre.name), 
            }));
            return res.status(200).json(videogameFromApi);
        } else {
            const dbVideogames = await Videogames.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%` 
                    }
                },
                include: Genres,
            });

            if (dbVideogames && dbVideogames.length > 0) {
                const videogameFromDb = dbVideogames.map(dbVideogame => ({
                    id: dbVideogame.id,
                    name: dbVideogame.name,
                    description: dbVideogame.description,
                    platform: dbVideogame.platform,
                    image: dbVideogame.background_image,
                    released: dbVideogame.released,
                    rating: dbVideogame.rating,
                    genres: dbVideogame.Genres.map(genre => genre.name),
                }));
                return res.status(200).json(videogameFromDb);
            } else {
                return res.status(404).json({ error: "Juego no encontrado" });
            }
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener datos del videojuego" });
    }
}

module.exports = getVideogameName;
