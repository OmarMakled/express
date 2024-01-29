const { getAirQuality } = require('./api');
const { AirQuality } = require('./models');
const { createPollutionResult } = require('./utils');

exports.getAirQuality = async (req, res, next) => {
  const { lat, lon } = req.query;

  try {
    const responseData = await getAirQuality(lat, lon);
    res.json({
      Result: { Pollution: createPollutionResult(responseData.pollution) },
    });
  } catch (error) {
    console.error('Error fetching air quality data:', error.message);
    next(error);
  }
};

exports.getMostPolluted = async (req, res, next) => {
  try {
    const mostPollutedRecord = await AirQuality.findOne({}).sort({
      'pollution.aqius': -1,
    });
    if (mostPollutedRecord) {
      res.json({
        Result: {
          Pollution: createPollutionResult(mostPollutedRecord.pollution),
        },
      });
    } else {
      res.json({ message: 'No air quality data available yet.' });
    }
  } catch (error) {
    console.error('Error retrieving most polluted datetime:', error.message);
    next(error);
  }
};
