const express = require("express");
const router = express.Router();
const pokeController = require("./controllers/pokeController");

router.get("/", pokeController.getPokemons);
router.get("/pokemon/:id", pokeController.getPokemonById);
router.get("/types", pokeController.getTypes);
router.get("/type/:type", pokeController.getPokemonsByType);

module.exports = router;
