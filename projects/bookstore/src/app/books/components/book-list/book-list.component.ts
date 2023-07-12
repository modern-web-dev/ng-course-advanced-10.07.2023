import {Component} from '@angular/core';
import {BooksService} from "../../services/books.service";
import {Book} from "../../model/book";
import {Observable} from "rxjs";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  // providers: [BooksService]
})
export class BookListComponent {

  books$: Observable<Book[]>;
  selectedBook: Book | null = null;

  constructor(private booksService: BooksService) {
    this.books$ = booksService.getBooks();
  }

  selectBook(book: Book) {
    if (this.selectedBook === book) {
      this.selectedBook = null;
    } else {
      this.selectedBook = book;
    }
  }

  save(book: Book): void {
    if (this.selectedBook) {
      this.booksService.save(book).subscribe(_ => {
        this.selectedBook = null;
        this.books$ = this.booksService.getBooks();
      });
    } else {
      console.warn("Book is not selected!");
    }
  }
}
