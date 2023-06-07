import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {BooksService} from "../../services/books.service";
import {Book} from "../../model/book";
import {Observable, Subject, takeUntil} from "rxjs";
import {select, Store} from "@ngrx/store";
import {BooksState} from "../../store/books.reducer";
import {BooksSelector} from "../../store/books.selectors";
import {deselectBookAction, loadBooksAction, selectBookAction} from "../../store/books.actions";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  // providers: [BooksService]
})
export class BookListComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {

  readonly selectedBook$: Observable<Book | null>;
  readonly books$: Observable<Book[]>;

  private readonly unsubscribe$ = new Subject<void>();

  constructor(private readonly booksService: BooksService, private readonly store: Store<BooksState>) {
    console.log('BookList:constructor');

    this.books$ = this.store.pipe(select(BooksSelector.getBooks));
    this.selectedBook$ = this.store.pipe(select(BooksSelector.getSelectedBook));
    this.store.dispatch(loadBooksAction());
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`BookList:ngOnChanges`);
    console.log(JSON.stringify(changes));
  }

  ngOnInit(): void {
    console.log('BookList:ngOnInit');
  }

  ngAfterViewInit(): void {
    console.log('BookList:ngAfterViewInit');
  }

  ngOnDestroy(): void {
    console.log('BookList:ngOnDestroy');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  save(book: Book): void {
    this.booksService.save(book)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(_ => {
        this.deselectBook();
        this.store.dispatch(loadBooksAction())
      });
  }

  deselectBook(): void {
    this.store.dispatch(deselectBookAction());
  }

  selectBook(book: Book): void {
    this.store.dispatch(selectBookAction({book}));
  }
}
