import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookListComponent} from './components/book-list/book-list.component';
import {MaterialModule} from "../shared/material.module";
import {BooksService} from "./services/books.service";


@NgModule({
  declarations: [
    BookListComponent
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
