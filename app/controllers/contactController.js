const axios = require("axios");

const slackWebhookUrl =
  "https://hooks.slack.com/services/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";

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
    res.status(500).send("Erreur serveur");
  }
};

module.exports = {
  getContactForm,
  submitContactForm,
};
