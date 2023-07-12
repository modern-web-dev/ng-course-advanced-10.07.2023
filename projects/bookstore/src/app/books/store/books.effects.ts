import {Injectable} from "@angular/core";
import {BooksService} from "../services/books.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loadBooksAction, queryBooksAction, saveBookAction, setBooksAction} from "./books.actions";
import {map, mergeMap} from "rxjs";


@Injectable()
export class BooksEffects {

  constructor(private readonly actions$: Actions, private readonly booksService: BooksService) {
  }

  readonly loadBooks$ = createEffect(() => this.actions$.pipe(
    ofType(loadBooksAction),
    mergeMap(_ => this.booksService.getBooks()
      .pipe(
        map(books => setBooksAction({books}))
      ))
  ));

  readonly saveBook$ = createEffect(() => this.actions$.pipe(
    ofType(saveBookAction),
    mergeMap(action => this.booksService.save(action.book)
      .pipe(
        map(_ => loadBooksAction())))
  ));

  readonly queryBooks$ = createEffect(() => this.actions$.pipe(
    ofType(queryBooksAction),
    mergeMap(action => this.booksService.queryForBooks(action.query)
      .pipe(
        map(books => setBooksAction({books}))
      ))
  ));
}
