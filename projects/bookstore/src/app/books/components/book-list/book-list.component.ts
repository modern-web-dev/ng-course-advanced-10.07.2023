import {Component, OnDestroy} from '@angular/core';
import {BooksService} from "../../services/books.service";
import {Book} from "../../model/book";
import {debounceTime, distinctUntilChanged, filter, Observable, Subject, takeUntil} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  // providers: [BooksService]
})
export class BookListComponent implements OnDestroy {

  books$: Observable<Book[]>;
  selectedBook: Book | null = null;

  searchControl: FormControl;

  private unsubscribe$ = new Subject<void>();

  constructor(private booksService: BooksService) {
    this.searchControl = new FormControl();
    this.registerSearch();
    this.books$ = booksService.getBooks();
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
      this.booksService.save(book)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(_ => {
          this.selectedBook = null;
          this.books$ = this.booksService.getBooks();
        });
    } else {
      console.warn("Book is not selected!");
    }
  }

  private registerSearch() {
    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(value => value.length != 1),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => {
        console.log(`query=${value}`);
        if (value) {
          this.books$ = this.booksService.queryForBooks(value);
        } else {
          this.books$ = this.booksService.getBooks();
        }
      });
  }
}
