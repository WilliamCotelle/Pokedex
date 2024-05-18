const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

// Utiliser EJS comme moteur de template
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Expliquer à Express où se trouvent les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Importer les données des Pokémon depuis pokemons.json
const pokemonsPath = path.join(__dirname, "data", "pokemons.json");
const pokemons = JSON.parse(fs.readFileSync(pokemonsPath, "utf8"));

// Route pour servir la page d'accueil avec les Pokémon
app.get("/", (req, res) => {
  res.render("index", { pokemons });
});

// Route dynamique pour afficher un Pokémon spécifique
app.get("/pokemon/:pokemonId", (req, res) => {
  const pokemonId = req.params.pokemonId; // Récupérer l'ID du Pokémon depuis l'URL

  // Vérifier que le Pokémon existe
  const pokemon = pokemons.find((p) => p.id === pokemonId);

  if (pokemon) {
    res.render("pokemon", { pokemon });
  } else {
    // Si le Pokémon n'existe pas, envoyer une réponse 404
    res.status(404).send("Pokémon non trouvé");
  }
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
