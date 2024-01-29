const { getAirQuality, getMostPolluted } = require('./controllers');

module.exports.setupRoutes = (app) => {
  app.get('/api/air_quality', getAirQuality);
  app.get('/api/most_polluted', getMostPolluted);
};
