import {Injectable} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {BooksState} from "./books.reducer";
import {BooksSelector} from "./books.selectors";
import {deselectBookAction, loadBooksAction, queryBooksAction, saveBookAction, selectBookAction} from "./books.actions";
import {Book} from "../model/book";

@Injectable()
export class BooksFacadeService {

  constructor(private readonly store: Store<BooksState>) {
  }

  readonly books$ = this.store.pipe(select(BooksSelector.getBooks));
  readonly selectedBook$ = this.store.pipe(select(BooksSelector.getSelectedBook));

  loadBooks(): void {
    this.store.dispatch(loadBooksAction());
  }

  queryBooks(query: string): void {
    this.store.dispatch(queryBooksAction({query}));
  }

  selectBook(book: Book): void {
    this.store.dispatch(selectBookAction({book: book}));
  }

  deselectBook(): void {
    this.store.dispatch(deselectBookAction());
  }

  save(book: Book): void {
    this.store.dispatch(saveBookAction({book}));
  }
}
