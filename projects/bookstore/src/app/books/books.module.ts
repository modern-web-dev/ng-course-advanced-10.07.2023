import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../shared/material.module";
import { BookListComponent } from './components/book-list/book-list.component';



@NgModule({
  declarations: [
    BookListComponent
  ],
  exports: [
    BookListComponent
  ],
  imports: [
    MaterialModule,
    CommonModule
  ]
})
export class BooksModule { }
