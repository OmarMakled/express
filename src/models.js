const mongoose = require('mongoose');

const airQualitySchema = new mongoose.Schema({
  dateTime: { type: Date, default: Date.now },
  pollution: {
    ts: String,
    aqius: Number,
    mainus: String,
    aqicn: Number,
    maincn: String,
  },
});

const AirQuality = mongoose.model('AirQuality', airQualitySchema);

module.exports = { AirQuality };
