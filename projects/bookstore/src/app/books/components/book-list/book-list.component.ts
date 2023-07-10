import { Component } from '@angular/core';
import {BooksService} from "../../services/books.service";
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: [BooksService]
})
export class BookListComponent {

  books: Book[] = [];

  selectedBook: Book | null = null;

  constructor(private booksService: BooksService) {
    this.books = booksService.getBooks();
  }

  selectBook(book: Book) {
    if (this.selectedBook === book) {
      this.selectedBook = null;
    } else {
      this.selectedBook = book;
    }
  }
}
