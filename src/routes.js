const {
  addBookHandler, getBookHandler, editBookHandler, deleteBookHandler,
} = require('./handler');

const routes = [
  // Menambah Buku
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },

  // Mengambil Buku
  {
    method: 'GET',
    path: '/books/{bookId?}',
    handler: getBookHandler,
  },

  // Menyunting Buku
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookHandler,
  },

  // Menghapus Buku
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookHandler,
  },
];

module.exports = routes;
