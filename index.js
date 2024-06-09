const express = require("express");
const path = require("path");
const router = require("./app/router");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

// Utiliser EJS comme moteur de template
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app", "views"));

// Expliquer à Express où se trouvent les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Middleware pour analyser les données de formulaire
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(router);

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
