const app = require('./app');
const { connectToDatabase, closeDatabaseConnection } = require('./database');

const port = process.env.NODE_ENV === 'test' ? 3001 : process.env.PORT || 3000;

async function startHttpServer() {
  try {
    const server = app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
    return server;
  } catch (error) {
    console.error('Error starting HTTP server:', error);
    process.exit(1);
  }
}

async function startMongoDBConnection() {
  try {
    await connectToDatabase();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

async function closeHttpServer(server) {
  try {
    await server.close();
    console.log('HTTP server closed');
  } catch (error) {
    console.error('Error closing HTTP server:', error);
    process.exit(1);
  }
}

async function closeMongoDBConnection() {
  try {
    await closeDatabaseConnection();
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
    process.exit(1);
  }
}

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

module.exports = {
  startHttpServer,
  startMongoDBConnection,
  closeHttpServer,
  closeMongoDBConnection,
};
