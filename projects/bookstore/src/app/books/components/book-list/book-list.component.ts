import {Component, ElementRef, ViewChild} from '@angular/core';
import {BooksService} from "../../services/books.service";
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: [BooksService]
})
export class BookListComponent {

  books: Book[] = [];

  selectedBook: Book | null = null;

  @ViewChild("title")
  titleElement!: ElementRef<HTMLInputElement>;

  @ViewChild("author")
  authorElement!: ElementRef<HTMLInputElement>;

  @ViewChild("description")
  descriptionElement!: ElementRef<HTMLTextAreaElement>;

  constructor(private booksService: BooksService) {
    this.books = booksService.getBooks();
  }

  selectBook(book: Book) {
    if (this.selectedBook === book) {
      this.selectedBook = null;
    } else {
      this.selectedBook = book;
    }
  }

  save(): void {
    if (this.selectedBook) {
      const book: Book = {
        id: this.selectedBook?.id,
        title: this.titleElement.nativeElement.value,
        author: this.authorElement.nativeElement.value,
        description: this.descriptionElement.nativeElement.value
      }
      this.booksService.save(book);
      this.selectedBook = null;
      this.books = this.booksService.getBooks();
    } else {
      console.warn("Book is not selected!");
    }
  }
}
