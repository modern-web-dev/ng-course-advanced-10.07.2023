import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookListComponent} from './components/book-list/book-list.component';
import {MaterialModule} from "../shared/material.module";
import {BooksService} from "./services/books.service";
import { BookDetailsComponent } from './components/book-list/book-details/book-details.component';


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
    MaterialModule
  ],
  providers: [
    BooksService
  ]
})
export class BooksModule {
}
