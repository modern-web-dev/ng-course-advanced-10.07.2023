import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookListComponent} from './components/book-list/book-list.component';
import {MaterialModule} from "../shared/material.module";
import {BooksService} from "./services/books.service";
import {BookDetailsComponent} from './components/book-list/book-details/book-details.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {BOOKS_FEATURE, booksStateReducer} from "./store/books.reducer";


@NgModule({
  declarations: [
    BookListComponent,
    BookDetailsComponent
  ],
  exports: [
    BookListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature(BOOKS_FEATURE, booksStateReducer)
  ],
  providers: [
    BooksService
  ]
})
export class BooksModule {
}
