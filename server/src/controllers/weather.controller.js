const axios = require('axios');

exports.getLocalWeather = async (req, res) => {
  const { lat, lon } = req.query;
  
  if (!lat || !lon) {
    return res.status(400).json({ error: "Missing coordinates" });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY || '85ccfbe08ab08a26c42dd448fa789d01'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const response = await axios.get(url);
    
    // Engine Warning Flag Logic
    const temp = response.data.main.temp;
    const highEvaporation = temp > 35; // Common in Kerala heat
    
    res.json({
      temperature: temp,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      city: response.data.name,
      warnings: highEvaporation ? ['HIGH_EVAPORATION_RISK'] : []
    });
  } catch (error) {
    console.error("Weather Fetch Error:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data from OpenWeather" });
  }
};
