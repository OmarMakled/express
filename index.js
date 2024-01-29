const { startHttpServer, startMongoDBConnection } = require('./src/server');

(async () => {
  await startHttpServer();
  await startMongoDBConnection();
})();
