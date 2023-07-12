import { Injectable } from '@angular/core';
import {Book} from "../model/book";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class BooksService {

  constructor(private http: HttpClient) {
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>("http://localhost:3000/books");
  }

  save(book: Book): Observable<Book> {
    return this.http.put<Book>(`http://localhost:3000/books/${book.id}`, book);
  }
}
