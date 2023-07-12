import {Component, OnDestroy} from '@angular/core';
import {Book} from "../../model/book";
import {Observable, Subject} from "rxjs";
import {FormControl} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {BooksState} from "../../store/books.reducer";
import {BooksSelector} from "../../store/books.selectors";
import {deselectBookAction, loadBooksAction, saveBookAction, selectBookAction} from "../../store/books.actions";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  // providers: [BooksService]
})
export class BookListComponent implements OnDestroy {

  readonly books$: Observable<Book[]>;
  readonly selectedBook$: Observable<Book | null>;

  searchControl: FormControl;

  private unsubscribe$ = new Subject<void>();

  constructor(private readonly store: Store<BooksState>) {
    this.searchControl = new FormControl();
    this.registerSearch();
    this.books$ = this.store.pipe(select(BooksSelector.getBooks));
    this.selectedBook$ = this.store.pipe(select(BooksSelector.getSelectedBook));
    this.loadBooks();
  }

  private loadBooks() {
    this.store.dispatch(loadBooksAction());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selectBook(book: Book) {
    this.store.dispatch(selectBookAction({book}));
  }

  save(book: Book): void {
    this.store.dispatch(saveBookAction({book}));
    this.deselectBook();
  }

  deselectBook(): void {
    this.store.dispatch(deselectBookAction());
  }


  private registerSearch() {
    // this.searchControl.valueChanges
    //   .pipe(
    //     takeUntil(this.unsubscribe$),
    //     filter(value => value.length != 1),
    //     debounceTime(500),
    //     distinctUntilChanged()
    //   )
    //   .subscribe(value => {
    //     console.log(`query=${value}`);
    //     if (value) {
    //       this.books$ = this.booksService.queryForBooks(value);
    //     } else {
    //       this.books$ = this.booksService.getBooks();
    //     }
    //   });
  }

}
