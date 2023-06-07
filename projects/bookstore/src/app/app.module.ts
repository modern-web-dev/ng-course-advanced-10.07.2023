import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GidcRootModule} from "@gidc/pali/root-module";
import {BooksModule} from "./books/books.module";
import {StoreModule} from "@ngrx/store";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BooksModule,
    StoreModule.forRoot({}),
    GidcRootModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
