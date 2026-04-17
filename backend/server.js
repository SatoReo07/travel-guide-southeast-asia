const express = require('express');
const cors = require('cors');
const { countries } = require('./data/countries');

const countriesMap = new Map(countries.map((c) => [c.slug, c]));

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/countries', (req, res) => {
  res.json(countries);
});

app.get('/api/countries/:slug', (req, res) => {
  const country = countriesMap.get(req.params.slug);
  if (!country) return res.status(404).json({ error: 'Not found' });
  res.json(country);
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
