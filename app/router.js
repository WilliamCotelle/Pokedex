const express = require("express");
const router = express.Router();
const pokeController = require("./controllers/pokeController");

router.get("/", pokeController.getPokemons);
router.get("/pokemon/:id", pokeController.getPokemonById);

module.exports = router;
