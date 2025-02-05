const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Activer CORS pour autoriser les connexions externes (comme Wix)
app.use(cors());

// Base de données simple d'horoscopes
const horoscopes = {
  belier: {
    daily: "Aujourd’hui, soyez audacieux et prenez des initiatives.",
    weekly: "Cette semaine, de nouvelles opportunités professionnelles s’offrent à vous.",
    monthly: "Ce mois-ci, attendez-vous à une transformation personnelle."
  },
  taureau: {
    daily: "Prenez le temps de vous recentrer sur vos priorités.",
    weekly: "Des tensions familiales peuvent apparaître, restez calme.",
    monthly: "Un changement important dans votre carrière pourrait se profiler."
  },
  gemeaux: {
    daily: "Une journée propice aux nouvelles rencontres.",
    weekly: "Faites attention à vos finances cette semaine.",
    monthly: "Une période de créativité s’annonce pour vous."
  },
  // Ajoute ici les autres signes astrologiques...
};

// Route pour récupérer un horoscope selon le signe et la période (daily, weekly, monthly)
app.get("/horoscope", (req, res) => {
  const { sign, type } = req.query; // Lire les paramètres de la requête
  if (!sign || !type) {
    return res.status(400).json({ error: "Veuillez fournir un signe et un type (daily, weekly, monthly)." });
  }

  const horoscope = horoscopes[sign.toLowerCase()]?.[type.toLowerCase()];
  if (!horoscope) {
    return res.status(404).json({ error: "Signe ou type invalide." });
  }

  res.json({ sign, type, horoscope });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`✅ API d'horoscope en ligne sur http://localhost:${PORT}`);
});
 
