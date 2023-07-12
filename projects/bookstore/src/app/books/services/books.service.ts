import { Injectable } from '@angular/core';
import {Book} from "../model/book";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

const BOOKS_URL = `${environment.backendUrl}/books`

@Injectable()
export class BooksService {

  constructor(private http: HttpClient) {
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${BOOKS_URL}`);
  }

  save(book: Book): Observable<Book> {
    return this.http.put<Book>(`${BOOKS_URL}/${book.id}`, book);
  }
}
