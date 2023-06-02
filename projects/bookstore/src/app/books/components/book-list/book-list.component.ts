import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Book} from "../../model/book";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  @ViewChild("title")
  titleElement!: ElementRef<HTMLInputElement>;

  @ViewChild("author")
  authorElement!: ElementRef<HTMLInputElement>;

  @ViewChild("description")
  descriptionElement!: ElementRef<HTMLTextAreaElement>;

  books: Book[] = [];

  selectedBook: Book | null = null;

  constructor(private readonly bookService: BookService) {
    this.books = this.bookService.getBooks();
  }

  ngOnInit(): void {
  }

  saveButton(): void {
    if (this.selectedBook) {
      const book: Book = {
        id: this.selectedBook.id,
        title: this.titleElement.nativeElement.value,
        author: this.authorElement.nativeElement.value,
        description: this.descriptionElement.nativeElement.value
      };
      this.bookService.saveBook(book);
      this.selectedBook = null;
      this.books = this.bookService.getBooks();
    }
  }
}
