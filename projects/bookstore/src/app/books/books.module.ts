import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../shared/material.module";
import { BookListComponent } from './components/book-list/book-list.component';
import {BooksService} from "./services/books.service";
import { BookDetailsComponent } from './components/book-details/book-details.component';
import {FormsModule} from "@angular/forms";



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
    FormsModule
  ],
  providers: [
    BooksService
  ]
})
export class BooksModule { }
