import {Component, OnDestroy} from '@angular/core';
import {Book} from "../../model/book";
import {debounceTime, distinctUntilChanged, filter, Observable, Subject, takeUntil} from "rxjs";
import {FormControl} from "@angular/forms";
import {BooksFacadeService} from "../../store/books-facade.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  // providers: [BooksService]
})
export class BookListComponent implements OnDestroy {

  readonly books$: Observable<Book[]>;
  readonly selectedBook$: Observable<Book | null>;

  searchControl: FormControl;

  private unsubscribe$ = new Subject<void>();

  constructor(private readonly facade: BooksFacadeService) {
    this.searchControl = new FormControl();
    this.registerSearch();
    this.books$ = this.facade.books$;
    this.selectedBook$ = this.facade.selectedBook$;
    this.facade.loadBooks();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selectBook(book: Book) {
    this.facade.selectBook(book);
  }

  save(book: Book): void {
    this.facade.save(book);
    this.deselectBook();
  }

  deselectBook(): void {
    this.facade.deselectBook();
  }

  private registerSearch() {
    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(value => value.length != 1),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => {
        console.log(`query=${value}`);
        if (value) {
          this.facade.queryBooks(value);
        } else {
          this.facade.loadBooks();
        }
      });
  }
}
