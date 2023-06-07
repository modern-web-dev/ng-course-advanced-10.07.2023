import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../shared/material.module";
import {BookListComponent} from './components/book-list/book-list.component';
import {BooksService} from "./services/books.service";
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    BookListComponent,
    BookDetailsComponent
  ],
  exports: [
    BookListComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    BooksService
  ]
})
export class BooksModule {
}
