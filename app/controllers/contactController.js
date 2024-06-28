const axios = require("axios");
require("dotenv").config();
const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL; // URL du webhook Slack

const getContactForm = (req, res) => {
  res.render("contact");
};

const submitContactForm = async (req, res) => {
  const { name, surname, comments } = req.body;

  const message = {
    text: `Nouveau message de contact reçu:\n
    *Nom*: ${name}\n
    *Prénom*: ${surname}\n
    *Commentaires*: ${comments}`,
  };

  try {
    await axios.post(slackWebhookUrl, JSON.stringify(message), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Nom:", name);
    console.log("Prénom:", surname);
    console.log("Commentaires:", comments);

    res.render("thank-you", { surname, name });
  } catch (error) {
    console.error("Erreur lors de l'envoi du message à Slack:", error);
    res.status(500).render("500");
  }
};

module.exports = {
  getContactForm,
  submitContactForm,
};
