import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input()
  book: Book | null = null;

  editedBook: Book | null = null;

  @Output()
  cancelClicked = new EventEmitter<void>();
  @Output()
  saveClicked = new EventEmitter<Book>();

  constructor() {
    console.log('BookDetailsComponent:constructor');
  }

  ngOnInit(): void {
    console.log('BookDetailsComponent:ngOnInit');
  }

  ngOnDestroy(): void {
    console.log('BookDetailsComponent:ngOnDestroy');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('BookDetailsComponent:ngOnChanges');
    console.log(JSON.stringify(changes));

    if(changes['book']) {
      this.editedBook = {...changes['book'].currentValue};
    }
  }

  ngAfterViewInit() {
    console.log('BookDetailsComponent:ngAfterViewInit');
  }

  save(): void {
    if (this.editedBook) {
      this.saveClicked.emit(this.editedBook);
    }
  }
}
