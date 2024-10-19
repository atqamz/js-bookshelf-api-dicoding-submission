// 24/05/2021 created by Atqa Munzir for Submission Dicoding 'Belajar Membuat Aplikasi Back-End untuk Pemula'
// 19/10/2024 modified by Atqa Munzir for Submission Dicoding 'Belajar Back-End untuk Pemula dengan JavaScript'

const {
  addBookHandler,
  getBookHandler,
  editBookHandler,
  deleteBookHandler,
} = require("./handler");

const routes = [
  // Menambah Buku
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },

  // Mengambil Buku
  {
    method: "GET",
    path: "/books/{bookId?}",
    handler: getBookHandler,
  },

  // Menyunting Buku
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBookHandler,
  },

  // Menghapus Buku
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookHandler,
  },
];

module.exports = routes;
