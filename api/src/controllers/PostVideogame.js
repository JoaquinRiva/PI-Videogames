const { Videogames, Genres } = require("../db");
const { v4: uuidv4 } = require('uuid');

async function PostVideogames(req, res) {
    try {
        const { name, description, platform, background_image, released, rating, genres} = req.body;

        if (!genres || genres.length === 0) {
            return res.status(400).json({ error: 'Debes proporcionar al menos un genero.' });
        }

        let existingVideogames = await Videogames.findOne({ where: { name } });

        if (existingVideogames) {
            existingVideogames.description = description;
            existingVideogames.platform = platform;
            existingVideogames.released = released;
            existingVideogames.rating = rating;
            existingVideogames.background_image = background_image;
            await existingVideogames.save();
        } else {
            existingVideogames = await Videogames.create({
                id: uuidv4(),
                name,
                description,
                platform,
                background_image,
                released,
                rating
            });
        }

        for (const genresName of genres) {
            const gen = await Genres.findOne({
                where: { name: genresName },
            })

            if (gen) {
                await existingVideogames.addGenres(gen);
            }
        }
        res.status(201).json({ id: existingVideogames.id, message: 'Juego creado o cambiado exitosamente!' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear o actualizar el juego' });
    }
}

module.exports = PostVideogames;
