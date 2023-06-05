import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BooksService} from "../../services/books.service";
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: [ BooksService ]
})
export class BookListComponent {

  @ViewChild("title")
  titleElement!: ElementRef<HTMLInputElement>;

  @ViewChild("author")
  authorElement!: ElementRef<HTMLInputElement>;

  @ViewChild("description")
  descriptionElement!: ElementRef<HTMLTextAreaElement>;

  selectedBook: Book | null = null;

  books: Book[] = [];

  constructor(private readonly booksService: BooksService) {
    this.books = this.booksService.getBooks();
  }

  save(): void {
    if (this.selectedBook) {
      const book: Book = {
        id: this.selectedBook.id,
        title: this.titleElement.nativeElement.value,
        author: this.authorElement.nativeElement.value,
        description: this.descriptionElement.nativeElement.value
      };
      this.booksService.save(book);
      this.selectedBook = null;
      this.books = this.booksService.getBooks();
    }
  }
}
