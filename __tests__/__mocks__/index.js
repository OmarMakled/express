const pollution = {
  ts: '2024-01-29T07:00:00.000Z',
  aqius: 156,
  mainus: 'p2',
  aqicn: 88,
  maincn: 'p2',
};
const mockResponse = {
  data: {
    status: 'success',
    data: {
      current: {
        pollution,
      },
    },
  },
};

module.exports = { pollution, mockResponse };
