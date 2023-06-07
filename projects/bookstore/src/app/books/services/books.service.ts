import {Injectable, OnDestroy} from '@angular/core';
import {Book} from "../model/book";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";


// const API_PREFIX = "http://localhost:3000/books";

@Injectable()
export class BooksService implements OnDestroy {

  readonly backendUrl: string;

  constructor(private readonly http: HttpClient) {
    this.backendUrl = environment.backendUrl;
    console.log("BooksService:constructor");
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.backendUrl}/books`);
  }

  save(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.backendUrl}/books/${book.id}`, book);
  }

  ngOnDestroy(): void {
    console.log("BooksService:ngOnDestroy");
  }
}
