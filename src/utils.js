exports.createPollutionResult = (pollutionData) => {
  const {
    ts = '',
    aqius = '',
    mainus = '',
    aqicn = '',
    maincn = '',
  } = pollutionData;
  return { ts, aqius, mainus, aqicn, maincn };
};

exports.handleErrors = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
};
