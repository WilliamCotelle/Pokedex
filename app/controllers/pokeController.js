const pool = require("../db");

const homePage = (req, res) => {
  res.render("index");
};

const getPokemons = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT pokemon.id, pokemon.name, pokemon.description, pokemon.image_url, array_agg(type.type) AS types 
      FROM pokemon 
      JOIN type ON pokemon.id = type.pokemon_id 
      GROUP BY pokemon.id 
      ORDER BY pokemon.id
    `);
    res.render("pokemons", { pokemons: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).render("500");
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
      res.status(404).render("404");
    }
  } catch (err) {
    console.error(err);
    res.status(500).render("500");
  }
};

// Afficher la vue des types de Pokémon
const getTypes = async (req, res) => {
  try {
    const result = await pool.query("SELECT DISTINCT type FROM type");
    const types = result.rows.map((row) => row.type);
    res.render("types", { types });
  } catch (err) {
    console.error(err);
    res.status(500).render("500");
  }
};

// Afficher les Pokémon par type
const getPokemonsByType = async (req, res) => {
  const { type } = req.params;
  try {
    const result = await pool.query(
      `
        SELECT pokemon.id, pokemon.name, pokemon.description, pokemon.image_url, array_agg(type.type) as types
        FROM pokemon
        JOIN type ON pokemon.id = type.pokemon_id
        WHERE type.type = $1
        GROUP BY pokemon.id
      `,
      [type]
    );

    const pokemons = result.rows;
    res.render("type", { pokemons, type });
  } catch (err) {
    console.error(err);
    res.status(500).render("500");
  }
};

const getPokemonNames = async (req, res) => {
  try {
    const result = await pool.query("SELECT name FROM pokemon ORDER BY name");
    const names = result.rows.map((row) => row.name);
    res.json(names);
  } catch (err) {
    console.error(err);
    res.status(500).render("500");
  }
};

module.exports = {
  homePage,
  getPokemons,
  getPokemonById,
  getTypes,
  getPokemonsByType,
  getPokemonNames,
};
