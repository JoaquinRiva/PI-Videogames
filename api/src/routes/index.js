const { Router } = require('express');
const PostVideogame = require("../controllers/PostVideogame")
const getVideogames = require("../controllers/getVideogames");
const getVideogameId = require("../controllers/getVideogameId")
const getVideogameName = require("../controllers/getVideogameName");
const getGenres = require('../controllers/getGenres');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/videogames', getVideogames);
router.get('/videogames/:idVideogame', getVideogameId);
router.get('/videogamesName', getVideogameName)
router.get('/genres', getGenres)
router.post('/videogames', PostVideogame)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
