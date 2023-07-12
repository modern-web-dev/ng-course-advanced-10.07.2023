import {createAction, props} from "@ngrx/store";
import {Book} from "../model/book";

export enum BooksActionsType {
  SetBooks = '[Books] Set books',
  SelectBook = '[Books] Select book',
  DeselectBook = '[Books] Deselect book',
  LoadBooks = '[Books] Load books',
  SaveBook = '[Books] Save book',
  QueryBooks = '[Books] Query books'
}

export const setBooksAction = createAction(BooksActionsType.SetBooks, props<{ books: Book[] }>());
export const selectBookAction = createAction(BooksActionsType.SelectBook, props<{ book: Book }>());
export const deselectBookAction = createAction(BooksActionsType.DeselectBook);
export const loadBooksAction = createAction(BooksActionsType.LoadBooks);
export const saveBookAction = createAction(BooksActionsType.SaveBook, props<{ book: Book }>());
export const queryBooksAction = createAction(BooksActionsType.QueryBooks, props<{ query: string }>());
