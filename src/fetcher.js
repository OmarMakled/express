const { AirQuality } = require('./models');
const { getAirQuality } = require('./api');
const { createPollutionResult } = require('./utils');
require('dotenv').config();

exports.fetchAndSaveAirQuality = async () => {
  const DEFAULT_LAT = process.env.DEFAULT_LAT || '48.856613';
  const DEFAULT_LON = process.env.DEFAULT_LON || '2.352222';

  const responseData = await getAirQuality(DEFAULT_LAT, DEFAULT_LON);
  const pollutionResult = createPollutionResult(responseData.pollution);
  const airQuality = new AirQuality({
    pollution: pollutionResult,
  });

  await airQuality.save();
  console.info('Air Quality Data Saved', {
    DEFAULT_LAT,
    DEFAULT_LON,
    pollutionResult,
  });
};
