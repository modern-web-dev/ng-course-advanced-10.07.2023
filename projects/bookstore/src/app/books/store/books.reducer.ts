import {Book} from "../model/book";
import {createReducer, on} from "@ngrx/store";
import {deselectBookAction, selectBookAction, setBooksAction} from "./books.actions";


export const BOOKS_FEATURE = 'Books';

export interface BooksState {
  books: Book[],
  selectedBook: Book | null
}

export const INITIAL_BOOKS_STATE: BooksState = {
  books: [],
  selectedBook: null
}

export const booksStateReducer = createReducer(
  INITIAL_BOOKS_STATE,
  on(setBooksAction, (state: BooksState, {books}) => ({...state, books: books})),
  on(selectBookAction, (state: BooksState, {book}) => ({...state, selectedBook: book})),
  on(deselectBookAction, (state: BooksState) => ({...state, selectedBook: null}))
);
