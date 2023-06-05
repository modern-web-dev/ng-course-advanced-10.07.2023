import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {GidcRootModule} from "@gidc/pali/root-module";
import {MaterialModule} from "./shared/material.module";
import {BooksModule} from "./books/books.module";
import {BooksService} from "./books/services/books.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BooksModule,
    GidcRootModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
