const { Videogames, Genres } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

async function getVideogameId(req, res) {
    try {
        const { idVideogame } = req.params;

        const isUUID = idVideogame.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);

        let videogame;

        if (isUUID) {
            videogame = await Videogames.findOne({
                where: { id: idVideogame },
            });

            if (videogame) {
                const genres = await Genres.findAll({
                    include: [{
                        model: Videogames,
                        where: { id: idVideogame },
                        through: {
                            attributes: []
                        }
                    }]
                });

                videogame = {
                    id: videogame.id,
                    name: videogame.name,
                    description: videogame.description,
                    platform: videogame.platform,
                    image: videogame.background_image,
                    released: videogame.released,
                    rating: videogame.rating,
                    genres: genres.map(genre => genre.name),
                };
            }
        } else {
            const apiResponse = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
            const apiVideogame = apiResponse.data;

            videogame = {
                id: apiVideogame.id,
                name: apiVideogame.name,
                description: apiVideogame.description,
                platform: apiVideogame.platform,
                image: apiVideogame.background_image,
                released: apiVideogame.released,
                rating: apiVideogame.rating,
                genres: apiVideogame.genres.map(genre => genre.name), 
            };
        }

        if (videogame) {
            const formattedVideogame = {
                id: videogame.id,
                name: videogame.name,
                description: videogame.description,
                platform: videogame.platform,
                image: videogame.image,
                released: videogame.released,
                rating: videogame.rating,
                genres: videogame.genres,
            };

            return res.status(200).json(formattedVideogame);
        }

        res.status(404).json({ error: "Videojuego no encontrado" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener datos de videojuegos" });
    }
}

module.exports = getVideogameId;
