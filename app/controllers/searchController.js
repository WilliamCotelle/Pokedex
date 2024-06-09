const pool = require("../db");

exports.search = async (req, res) => {
  const queryParam = req.query.query;

  if (!queryParam) {
    return res.redirect("/pokemon");
  }

  const query =
    queryParam.charAt(0).toUpperCase() + queryParam.slice(1).toLowerCase();

  try {
    const result = await pool.query("SELECT * FROM pokemon WHERE name = $1", [
      query,
    ]);

    if (result.rows.length > 0) {
      const pokemon = result.rows[0];
      res.redirect(`/pokemon/${pokemon.id}`);
    } else {
      res.redirect("/pokemon");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
};
