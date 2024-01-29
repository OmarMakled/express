const mongoose = require('mongoose');
require('dotenv').config();

const connectToDatabase = async () => {
  try {
    const DB_URL = process.env.DB_URL;
    await mongoose.connect(DB_URL);

    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};

const closeDatabaseConnection = async () => {
  try {
    await mongoose.connection.close();
    console.log('Disconnected from the database');
  } catch (error) {
    console.error('Error disconnecting from the database:', error.message);
    throw error;
  }
};

module.exports = { connectToDatabase, closeDatabaseConnection };
