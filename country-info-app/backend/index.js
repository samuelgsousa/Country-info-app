const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 5000;

app.use(cors());

app.get('/api/list', async (req, res) => {
  try {
    const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
    res.json(response.data);  // Retorna os dados recebidos da API externa
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

app.get('/api/country/:countryCode', async (req, res) => {
    try {
      const countryCode = req.params.countryCode;
      const response = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);
      res.json(response.data);  // Retorna os dados recebidos da API externa
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data' });
    }
  });

  app.get('/api/population', async (req, res) => {
    try {
      const response = await axios.get(`https://countriesnow.space/api/v0.1/countries/population`);
      res.json(response.data);  // Retorna os dados recebidos da API externa
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data' });
    }
  });

  app.get('/api/flags', async (req, res) => {
    try {
        console.log("chamado")
      const response = await axios.get(`https://countriesnow.space/api/v0.1/countries/flag/images`);
      res.json(response.data);  // Retorna os dados recebidos da API externa
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data' });
    }
  });

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
