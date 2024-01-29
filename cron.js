const cron = require('node-cron');
const { connectToDatabase } = require('./src/database');
const { fetchAndSaveAirQuality } = require('./src/fetcher');
require('dotenv').config();

const CRON_SCHEDULE = process.env.CRON_SCHEDULE || '* * * * *';

(async () => {
  try {
    await connectToDatabase();
    cron.schedule(CRON_SCHEDULE, fetchAndSaveAirQuality);
    console.info('Cron job scheduled successfully.');
  } catch (error) {
    console.error('Error in cron job:', error);
    process.exit(1);
  }
})();
