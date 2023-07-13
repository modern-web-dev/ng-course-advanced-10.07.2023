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
import {EffectsModule} from "@ngrx/effects";
import {BooksEffects} from "./store/books.effects";
import {BooksFacadeService} from "./store/books-facade.service";
import {PublisherDetailsComponent} from './components/book-list/publisher-details/publisher-details.component';
import {WidgetsModule} from "../../../../widgets/src/lib/widgets.module";


@NgModule({
  declarations: [
    BookListComponent,
    BookDetailsComponent,
    PublisherDetailsComponent
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
    WidgetsModule,
    StoreModule.forFeature(BOOKS_FEATURE, booksStateReducer),
    EffectsModule.forFeature([BooksEffects])
  ],
  providers: [
    BooksService, BooksFacadeService
  ]
})
export class BooksModule {
}
