import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {BooksService} from "../../services/books.service";
import {Book} from "../../model/book";
import {Observable, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  // providers: [BooksService]
})
export class BookListComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {

  selectedBook: Book | null = null;

  books$: Observable<Book[]>;

  private readonly unsubscribe$ = new Subject<void>();

  constructor(private readonly booksService: BooksService) {
    console.log('BookList:constructor');
    this.books$ = this.booksService.getBooks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`BookList:ngOnChanges`);
    console.log(JSON.stringify(changes));
  }

  ngOnInit(): void {
    console.log('BookList:ngOnInit');
  }

  ngAfterViewInit(): void {
    console.log('BookList:ngAfterViewInit');
  }

  ngOnDestroy(): void {
    console.log('BookList:ngOnDestroy');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  save(book: Book): void {
    if (this.selectedBook) {

      this.booksService.save(book)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(_ => {
          this.selectedBook = null;
          this.books$ = this.booksService.getBooks();
        });
    }
  }
}
