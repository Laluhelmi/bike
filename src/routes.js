const { getAllTransactions }                          = require('./controller/transactionList');
const { getRunningBike, getAvailableBikes }           = require('./controller/bikes');
const { insertTransaction, changeTransactionStatus, extendTransactions }  = require('./controller/transaction');
const { getAllGuests }                                = require('./controller/guest');

const routes = [
  {
    method        : 'GET',
    path          : '/',
    handler       : getAllTransactions,
  },
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
  {
    method        : 'POST',
    path          : '/new-transaction',
    handler       : insertTransaction,
  },
  {
    method        : 'GET',
    path          : '/guests',
    handler       : getAllGuests,
  },
  {
    method        : 'PUT',
    path          : '/finish-transaction',
    handler       : changeTransactionStatus,
  },
  {
    method        : 'POST',
    path          : '/extend-transaction',
    handler       : extendTransactions,
  },
];

module.exports = routes;



// const routes = [
//   {
//     method        : 'POST',
//     path          : '/books',
//     handler       : addBookHandler,
//   },
//   {
//     method        : 'GET',
//     path          : '/all',
//     handler       : getAllTransactions,
//   },
//   {
//     method        : 'GET',
//     path          : '/books/{id}',
//     handler       : getBookByIdHandler,
//   },
//   {
//     method        : 'PUT',
//     path          : '/books/{id}',
//     handler       : editBookHandler,
//   },
//   {
//     method        : 'DELETE',
//     path          : '/books/{id}',
//     handler       : deleteBookHandler,
//   },