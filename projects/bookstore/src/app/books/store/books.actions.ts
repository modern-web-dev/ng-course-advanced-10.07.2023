import {createAction, props} from "@ngrx/store";
import {Book} from "../model/book";

export enum BooksActionsType {
  SetBooks = '[Books] Set books',
  SelectBook = '[Books] Select book',
  DeselectBook = '[Books] Deselect book'
}

export const setBooksAction = createAction(BooksActionsType.SetBooks, props<{ books: Book[] }>());
export const selectBookAction = createAction(BooksActionsType.SelectBook, props<{ book: Book }>());
export const deselectBookAction = createAction(BooksActionsType.DeselectBook);
