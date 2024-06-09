const express = require("express");
const router = express.Router();
const pokeController = require("./controllers/pokeController");
const searchController = require("./controllers/searchController");
const contactController = require("./controllers/contactController");

router.get("/", pokeController.homePage);
router.get("/pokemon", pokeController.getPokemons);
router.get("/pokemon/:id", pokeController.getPokemonById);
router.get("/types", pokeController.getTypes);
router.get("/type/:type", pokeController.getPokemonsByType);
router.get("/search", searchController.search);
router.get("/contact", contactController.getContactForm);
router.post("/contact", contactController.submitContactForm);

// Nouvelle route pour obtenir les noms des Pokémon
router.get("/pokemon-names", pokeController.getPokemonNames);

module.exports = router;
