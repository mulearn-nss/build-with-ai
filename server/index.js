require('dotenv').config();
const express = require('express');
const cors = require('cors');
const aiRoutes = require('./src/routes/ai.routes');
const weatherController = require('./src/controllers/weather.controller');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong from Express bridge' });
});

// Weather Route
app.get('/api/weather', weatherController.getLocalWeather);

// AI Routes
app.use('/api', aiRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
