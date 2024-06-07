const pool = require("../db");

const getPokemons = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT pokemon.id, pokemon.name, pokemon.description, pokemon.image_url, array_agg(type.type) AS types 
      FROM pokemon 
      JOIN type ON pokemon.id = type.pokemon_id 
      GROUP BY pokemon.id 
      ORDER BY pokemon.id
    `);
    res.render("index", { pokemons: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
};

const getPokemonById = async (req, res) => {
  const { id } = req.params;
  try {
    const pokemonResult = await pool.query(
      "SELECT * FROM pokemon WHERE id = $1",
      [id]
    );
    const typeResult = await pool.query(
      "SELECT type FROM type WHERE pokemon_id = $1",
      [id]
    );

    if (pokemonResult.rows.length > 0) {
      const pokemon = pokemonResult.rows[0];
      pokemon.types = typeResult.rows.map((row) => row.type);
      res.render("pokemon", { pokemon });
    } else {
      res.status(404).send("Pokémon non trouvé");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
};

module.exports = {
  getPokemons,
  getPokemonById,
};
