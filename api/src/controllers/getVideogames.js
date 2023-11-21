const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogames, Genres } = require("../db");


async function getVideogames(req, res) {
    try {
        const apiResponse = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
        const apiData = apiResponse.data;
        const dbVideogames = await Videogames.findAll({
            include: Genres,
        });

        let allVideogames = [];

        if (Array.isArray(apiData.results)) {
            const apiVideogames = apiData.results.map((videogame) => ({
                name: videogame.name,
                id: videogame.id,
                description: videogame.description,
                platform: videogame.platforms.map(platform => platform.platform.name).join(', '),
                image: videogame.background_image,
                released: videogame.released,
                rating: videogame.rating,
                createdAtDatabase: false
                
            }));

            allVideogames = [...dbVideogames, ...apiVideogames];
        } else {
             allVideogames = dbVideogames;
        }

        console.log(allVideogames);
        res.status(200).json(allVideogames);
    } catch (error) {
        console.error("Error en getVideogames:", error);
        res.status(500).json({ error: "Algo anda mal" });
    }
}

module.exports = getVideogames;
