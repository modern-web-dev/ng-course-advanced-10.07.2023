import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {BooksService} from "../../services/books.service";
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  // providers: [BooksService]
})
export class BookListComponent {

  books: Book[];
  selectedBook: Book | null = null;

  constructor(private booksService: BooksService, private cdr: ChangeDetectorRef) {
    this.books = booksService.getBooks();
  }

  selectBook(book: Book) {
    if (this.selectedBook === book) {
      this.selectedBook = null;
    } else {
      this.selectedBook = null;
      this.cdr.detectChanges();
      this.selectedBook = book;
    }
  }

  save(book: Book): void {
    if (this.selectedBook) {
      this.booksService.save(book);
      this.selectedBook = null;
      this.books = this.booksService.getBooks();
    } else {
      console.warn("Book is not selected!");
    }
  }
}
