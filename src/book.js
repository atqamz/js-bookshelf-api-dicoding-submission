const { nanoid } = require('nanoid');

const currentTime = new Date().toISOString();

class Book {
  constructor(data) {
    this.id = nanoid(16);
    this.name = data.name;
    this.year = data.year;
    this.author = data.author;
    this.summary = data.summary;
    this.publisher = data.publisher;
    this.pageCount = data.pageCount;
    this.readPage = data.readPage;
    this.finished = data.readPage === data.pageCount;
    this.reading = data.reading;

    this.insertedAt = currentTime;
    this.updatedAt = currentTime;
  }

  edit(data) {
    this.name = data.name;
    this.year = data.year;
    this.author = data.author;
    this.summary = data.summary;
    this.publisher = data.publisher;
    this.pageCount = data.pageCount;
    this.readPage = data.readPage;
    this.reading = data.reading;
    this.updatedAt = currentTime;
  }
}

module.exports = Book;
