import {
  Controller,
  Get,
  HttpCode,
  Post,
  Body,
  Param,
  Put,
  Req,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { createBookDto } from './dto/createbook.dto';
import { updatedBookDto } from './dto/updatebook.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
@Controller('api')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get('books')
  @HttpCode(200)
  async getAllBook(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query);
  }

  @Post('book/new')
  @UseGuards(AuthGuard())
  async CreateBook(@Body() book: createBookDto, @Req() req): Promise<Book> {
    return this.bookService.createBook(book, req.user);
  }

  @Get('book/:id')
  async findById(@Param('id') id: string): Promise<Book> {
    return this.bookService.findById(id);
  }

  @Put('book/:id')
  async updateById(
    @Param('id') id: string,
    @Body()
    book: updatedBookDto,
  ): Promise<Book> {
    console.log(book);
    return this.bookService.updateById(id, book);
  }

  @Delete('book/:id')
  async deleteId(@Param('id') id: string): Promise<Book[]> {
    return this.bookService.deleteById(id);
  }
}
