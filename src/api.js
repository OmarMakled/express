const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

const getAirQuality = async (lat, lon) => {
  const response = await axios.get(
    `${API_URL}nearest_city?lat=${lat}&lon=${lon}&key=${API_KEY}`,
  );
  const {
    data: { status, data },
  } = response;

  if (status === 'success' && data && data.current && data.current.pollution) {
    const {
      current: { pollution },
    } = data;
    return { pollution };
  }

  throw new Error(
    'Failed to retrieve data from the external API. Response structure is not as expected.',
  );
};

module.exports = { getAirQuality };
