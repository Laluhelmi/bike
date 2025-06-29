const { nanoid } = require('nanoid');
const books      = require('./books');

// INSERT new book
const addBookHandler = (request, hapi) => {

  const { name, year, author, summary, publisher, pageCount, readPage, reading }  = request.payload;

  if (name == null || name == '') {
    return hapi.response({
      'status'  : 'fail',
      'message' : 'Gagal menambahkan buku. Mohon isi nama buku'
    }).code(400);
  }

  if (readPage > pageCount) {
    return hapi.response({
      'status'  : 'fail',
      'message' : 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    }).code(400);
  }

  const id         = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt  = insertedAt;
  const finished   = readPage == pageCount;

  const book     = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
  };

  books.push(book);

  const isSuccess = books.filter((book) => book.id == id).length > 0 ;

  if (isSuccess) {
    return hapi.response({
      'status'  : 'success',
      'message' : 'Buku berhasil ditambahkan',
      'data'    : {
        'bookId': id
      }
    }
    ).code(201);
  }

  return hapi.response({
    status : 'fail',
    message: 'Catatan gagal ditambahkan',
  }).code(500);

};

//GET all books
const getAllBooksHandler = (request, hapi) => {

  const { name, reading, finished } = request.query;

  if (name !== undefined) {
    const filteredBook = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    const mappedBook   = filteredBook.map((book) => {
      const  { id, name, publisher } = book;
      return { id, name, publisher };
    });

    return hapi.response({
      status  : 'success',
      data    : {
        'books' : mappedBook
      }
    }).code(200);
  };

  if (reading !== undefined && (reading == 0 || reading == 1)){
    const isReading    = reading == 1 ? true : false;
    const filteredBook = books.filter((book) => book.reading == isReading);
    const mappedBook   = filteredBook.map((book) => {
      const  { id, name, publisher } = book;
      return { id, name, publisher };
    });

    return hapi.response({
      status  : 'success',
      data    : {
        'books' : mappedBook
      }
    }).code(200);
  }

  if (finished !== undefined && (finished == 0 || finished == 1)){
    const isFinished   = finished == 1 ? true : false;
    const filteredBook = books.filter((book) => book.finished == isFinished);
    const mappedBook   = filteredBook.map((book) => {
      const  { id, name, publisher } = book;
      return { id, name, publisher };
    });

    return hapi.response({
      status  : 'success',
      data    : {
        'books' : mappedBook
      }
    }).code(200);
  }

  const mappedBook = books.map((book) => {
    const  { id, name, publisher } = book;
    return { id, name, publisher };
  });

  return hapi.response({
    status: 'success',
    data: {
      'books' : mappedBook
    }
  }).code(200);
};

//GET book by id
const getBookByIdHandler = (request, hapi) => {

  const { id }     = request.params;
  const book       = books.filter((n) => n.id === id)[0];


  if (book == undefined) {
    return hapi.response({
      status  : 'fail',
      message : 'Buku tidak ditemukan',
    }).code(404);
  }


  return hapi.response({
    status  : 'success',
    data    : {
      'book' : book
    }
  }).code(200);
};

//EDIT book
const editBookHandler = (request, hapi) => {
  const { id } = request.params;
  const index  = books.findIndex((book) => book.id === id);

  const { name, year, author, summary, publisher, pageCount, readPage, reading }  = request.payload;


  if (name == null || name == '') {
    return hapi.response({
      'status'    : 'fail',
      'message'   : 'Gagal memperbarui buku. Mohon isi nama buku'
    }).code(400);
  }

  if (readPage > pageCount) {
    return hapi.response({
      'status'    : 'fail',
      'message'   : 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    }).code(400);
  }

  const updatedAt  = new Date().toISOString();
  const finished   = readPage == pageCount;

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt
    };

    const response = hapi.response({
      status        : 'success',
      message       : 'Buku berhasil diperbarui',
    });

    response.code(200);
    return response;
  }
  const response = hapi.response({
    status      : 'fail',
    message     : 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;

};

//DELETE
const deleteBookHandler = (request, hapi) => {
  const { id } = request.params;
  const index  = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = hapi.response({
      status      : 'success',
      message     : 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = hapi.response({
    status      : 'fail',
    message     : 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};


module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookHandler, deleteBookHandler };
