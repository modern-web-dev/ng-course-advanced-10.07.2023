import {Injectable, OnDestroy} from '@angular/core';
import {Book} from "../model/book";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";


const API_PREFIX = "api";

@Injectable()
export class BooksService implements OnDestroy {


  constructor(private readonly http: HttpClient) {
    console.log("BooksService:constructor");
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${API_PREFIX}/books`);
  }

  save(book: Book): Observable<Book> {
    return this.http.put<Book>(`${API_PREFIX}/books/${book.id}`, book);
  }

  ngOnDestroy(): void {
    console.log("BooksService:ngOnDestroy");
  }
}
