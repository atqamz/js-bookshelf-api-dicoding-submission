/* eslint-disable consistent-return */
/* eslint-disable max-len */
const Book = require('./book');

const data = new Map();

// Kriteria 1 : API Menyimpan Buku
const addBookHandler = (request, h) => {
  const { payload } = request;
  const {
    name, pageCount, readPage,
  } = request.payload;

  try {
    // Client tidak melampirkan properti name pada request body
    if (name === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      }).code(400);

      return response;
    }

    // Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount
    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      }).code(400);

      return response;
    }

    // Buku berhasil dimasukkan
    const newBook = new Book(payload);
    data.set(newBook.id, newBook);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: newBook.id,
      },
    }).code(201);

    return response;

  // Server gagal memasukkan buku karena alasan umum (generic error)
  } catch {
    const response = h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    }).code(500);

    return response;
  }
};

const getBookHandler = (request, h) => {
  const { bookId } = request.params;
  const getBookById = data.get(bookId);

  // Kriteria 2 : API dapat menampilkan seluruh buku (dan juga memfilter buku berdasarkan name / reading / finished)
  if (bookId === undefined) {
    const { name, reading, finished } = request.query;
    const bookshelf = [...data.values()];

    let booksFiltered = bookshelf;

    // Filter berdasarkan nama
    if (name !== undefined) {
      booksFiltered = bookshelf
        .filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    }

    // Filter berdasarkan sudah/belum dibaca
    if (reading !== undefined) {
      booksFiltered = bookshelf
        .filter((book) => book.reading === (reading === '1'));
    }

    // Filter berdasarkan sudah/belum selesai dibaca
    if (finished !== undefined) {
      booksFiltered = bookshelf
        .filter((book) => book.finished === (finished === '1'));
    }

    const showBooks = [...booksFiltered.values()]
      .map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));

    const response = h.response({
      status: 'success',
      data: {
        books: showBooks,
      },
    }).code(200);

    return response;
  }

  // Kriteria 3 : API dapat menampilkan detail buku
  // Buku dengan id yang dilampirkan oleh client tidak ditemukan
  if (getBookById === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);

    return response;
  }

  // Buku dengan id yang dilampirkan ditemukan
  const response = h.response({
    status: 'success',
    data: {
      book: getBookById,
    },
  }).code(200);

  return response;
};

// Kriteria 4 : API dapat mengubah data buku
const editBookHandler = (request, h) => {
  const { payload } = request;
  const { bookId } = request.params;
  const {
    name, pageCount, readPage,
  } = request.payload;

  const getBookById = data.get(bookId);

  // Client tidak melampirkan properti name pada request body
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);

    return response;
  }

  // Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount
  if (readPage >= pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);

    return response;
  }

  // Id yang dilampirkan oleh client tidak ditemukkan oleh server
  if (getBookById === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);

    return response;
  }

  // Buku berhasil diperbarui
  getBookById.edit(payload);

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
    data: getBookById,
  }).code(200);

  return response;
};

// Kriteria 5 : API dapat menghapus buku
const deleteBookHandler = (request, h) => {
  const { bookId } = request.params;
  const getBookById = data.get(bookId);

  if (getBookById !== undefined) {
    data.delete(bookId);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);

    return response;
  }

  // Id yang dilampirkan tidak dimiliki oleh buku manapun
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);

  return response;
};

module.exports = {
  addBookHandler, getBookHandler, editBookHandler, deleteBookHandler,
};
