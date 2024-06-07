const express = require("express");
const path = require("path");
const fs = require("fs");
const router = require("./app/router");

const app = express();
const port = 3000;

// Utiliser EJS comme moteur de template
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app", "views"));

// Expliquer à Express où se trouvent les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

app.use(router);

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
