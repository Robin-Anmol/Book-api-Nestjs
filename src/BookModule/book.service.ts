import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import mongoose from 'mongoose';
import { Query as ExpressQuery } from 'express-serve-static-core';
@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query: ExpressQuery): Promise<Book[]> {
    const perPage = 2;

    const current = Number(query.page) || 1;
    const skip = perPage * (current - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const books = await this.bookModel
      .find({ ...keyword })
      .limit(perPage)
      .skip(skip);
    return books;
  }

  async createBook(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book);
    return res;
  }

  async findById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async updateById(id: string, book: Book): Promise<Book> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });

    return updatedBook;
  }
  async deleteById(id: string): Promise<Book[]> {
    await this.bookModel.findByIdAndDelete(id);
    const books = await this.findAll({});
    return books;
  }
}
