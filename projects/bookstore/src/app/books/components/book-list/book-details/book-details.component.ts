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
import {Book} from "../../../model/book";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {


  @Input()
  selectedBook!: Book;

  book!: Book;

  @Output()
  saveClicked = new EventEmitter<Book>()

  @Output()
  cancelClicked = new EventEmitter<void>();

  constructor() {
    console.log('BookDetails.constructor()');
  }

  ngOnInit(): void {
    console.log(`BookDetails.ngOnInit(), ${this.selectedBook}`);
  }

  ngAfterViewInit(): void {
    console.log(`BookDetails.ngAfterViewInit(), ${this.selectedBook}`);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`BookDetails.ngOnChanges(), ${JSON.stringify(changes)}, ${JSON.stringify(this.selectedBook)}`);
    if (changes['selectedBook']) {
      this.book = {...this.selectedBook};
    }
  }

  ngOnDestroy(): void {
    console.log(`BookDetails.ngOnDestroy(), ${this.selectedBook}`);
  }

  save(): void {
    if (this.book != null) {
      this.saveClicked.emit(this.book);
    }
  }

  cancel(): void {
    this.cancelClicked.emit();
  }
}
