import {
  AfterViewInit,
  Component,
  ElementRef, Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Book} from "../../model/book";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit {

  @ViewChild("title", { static: true })
  titleElement!: ElementRef<HTMLInputElement>;
  @ViewChild("author", { static: true })
  authorElement!: ElementRef<HTMLInputElement>;
  @ViewChild("description", { static: true })
  descriptionElement!: ElementRef<HTMLTextAreaElement>;

  @Input()
  selectedBook!: Book;

  constructor(private readonly bookService: BookService) {
    console.log('BookDetailsComponent constructor');
    console.log(JSON.stringify(this.titleElement));
  }

  ngOnInit(): void {
    console.log('BookDetailsComponent ngOnInit');
    console.log(JSON.stringify(this.titleElement));
  }

  ngOnDestroy(): void {
    console.log('BookDetailsComponent ngOnDestroy');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('BookDetailsComponent ngOnChanges');
    console.log(JSON.stringify(changes));
  }

  ngAfterViewInit(): void {
    console.log('BookDetailsComponent ngAfterViewInit');
    console.log(JSON.stringify(this.titleElement));
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
    }
  }
}
