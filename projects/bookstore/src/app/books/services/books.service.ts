import {Injectable, OnDestroy} from '@angular/core';
import {Book} from "../model/book";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


const API_PREFIX = "http://localhost:3000/books";

@Injectable()
export class BooksService implements OnDestroy {

  constructor(private readonly http: HttpClient) {
    console.log("BooksService:constructor");
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${API_PREFIX}`);
  }

  save(book: Book): Observable<Book> {
    return this.http.put<Book>(`${API_PREFIX}/${book.id}`, book);
  }

  ngOnDestroy(): void {
    console.log("BooksService:ngOnDestroy");
  }
}
