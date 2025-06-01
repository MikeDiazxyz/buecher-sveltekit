import { ObjectId } from 'mongodb';
import { db } from './db.js';

// Bücherfunktionen
export async function getAllBooks() {
  const books = await db.collection('books').find().toArray();
  return books.map(book => ({
    ...book,
    _id: book._id.toString()
  }));
}

export async function getBookById(id) {
  const book = await db.collection('books').findOne({ _id: new ObjectId(id) });
  return {
    ...book,
    _id: book._id.toString()
  };
}

export async function addBook(book) {
  return await db.collection('books').insertOne(book);
}

export async function updateBook(book) {
  const id = book._id;
  delete book._id;
  return await db.collection('books').updateOne(
    { _id: new ObjectId(id) },
    { $set: book }
  );
}

export async function deleteBook(id) {
  return await db.collection('books').deleteOne({ _id: new ObjectId(id) });
}

// Genresfunktionen
export async function getAllGenres() {
  const genres = await db.collection('genres').find().toArray();
  return genres.map(genre => ({
    ...genre,
    _id: genre._id.toString()
  }));
}

export async function getGenreById(id) {
  const genre = await db.collection('genres').findOne({ _id: new ObjectId(id) });
  return {
    ...genre,
    _id: genre._id.toString()
  };
}

export async function addGenre(genre) {
  return await db.collection('genres').insertOne(genre);
}

export async function updateGenre(genre) {
  const id = genre._id;
  delete genre._id;
  return await db.collection('genres').updateOne(
    { _id: new ObjectId(id) },
    { $set: genre }
  );
}

export async function deleteGenre(id) {
  return await db.collection('genres').deleteOne({ _id: new ObjectId(id) });
}