import { Component, OnInit } from '@angular/core';
import {Book} from "../../model/book";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  constructor(private readonly bookService: BookService) {
    this.books = this.bookService.getBooks();
  }

  ngOnInit(): void {
  }

}
