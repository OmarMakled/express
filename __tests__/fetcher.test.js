const axios = require('axios');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const { fetchAndSaveAirQuality } = require('../src/fetcher');
const { AirQuality } = require('../src/models');

const { pollution, mockResponse } = require('./__mocks__');

jest.mock('axios');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = await mongoServer.getUri();
  await mongoose.disconnect();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('fetchAndSaveAirQuality', () => {
  it('should fetch and save air quality data to the database', async () => {
    axios.get.mockResolvedValue(mockResponse);
    await fetchAndSaveAirQuality();
    const savedAirQuality = await AirQuality.findOne();
    expect(savedAirQuality).toBeDefined();
    expect(savedAirQuality.pollution).toEqual(pollution);
  });
});
