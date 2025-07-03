const { getAllTransactions } = require('./controller/listAll');
const { getRunningBike, getAvailableBikes } = require('./controller/bikes');

const routes = [
  {
    method        : 'GET',
    path          : '/all',
    handler       : getAllTransactions,
  },
  {
    method        : 'GET',
    path          : '/not-available-bikes',
    handler       : getRunningBike,
  },
  {
    method        : 'GET',
    path          : '/available-bikes',
    handler       : getAvailableBikes,
  },
];

module.exports = routes;