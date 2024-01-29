const supertest = require('supertest');
const axios = require('axios');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const app = require('../src/app');
const { AirQuality } = require('../src/models');
const { startHttpServer, closeHttpServer } = require('../src/server');
const { createPollutionResult } = require('../src/utils');

const { pollution, mockResponse } = require('./__mocks__');

const request = supertest(app);
jest.mock('axios');

let server;
let mongoServer;

beforeAll(async () => {
  server = await startHttpServer();
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = await mongoServer.getUri();
  await mongoose.disconnect();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await closeHttpServer(server);
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('getAirQuality', () => {
  it('should get air quality data for a given location', async () => {
    axios.get.mockResolvedValue(mockResponse);
    const response = await request
      .get('/api/air_quality')
      .query({ lat: 'latitude', lon: 'longitude' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      Result: { Pollution: createPollutionResult(pollution) },
    });
  });

  it('should handle errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('API error'));
    const response = await request
      .get('/api/air_quality')
      .query({ lat: 'latitude', lon: 'longitude' });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
  });
});

describe('getMostPolluted', () => {
  it('should return the most polluted air quality data', async () => {
    await AirQuality.create({ pollution });
    const response = await request.get('/api/most_polluted');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      Result: { Pollution: createPollutionResult(pollution) },
    });
  });

  it('should handle case where no air quality data is available', async () => {
    await AirQuality.deleteMany({});
    const response = await request.get('/api/most_polluted');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'No air quality data available yet.',
    });
  });

  it('should handle errors gracefully', async () => {
    jest.spyOn(AirQuality, 'findOne').mockImplementationOnce(() => {
      throw new Error('Database error');
    });
    const response = await request.get('/api/most_polluted');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
  });
});
