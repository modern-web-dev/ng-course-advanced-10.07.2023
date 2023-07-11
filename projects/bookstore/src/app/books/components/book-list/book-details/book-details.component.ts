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
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {


  @Input()
  selectedBook!: Book;

  formGroup: FormGroup;

  @Output()
  saveClicked = new EventEmitter<Book>()

  @Output()
  cancelClicked = new EventEmitter<void>();

  constructor() {
    console.log('BookDetails.constructor()');
    this.formGroup = new FormGroup({
      id: new FormControl(),
      title: new FormControl(),
      author: new FormControl(),
      description: new FormControl()
    });
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
      const newBook = {...this.selectedBook};
      this.formGroup.setValue(newBook);
    }
  }

  ngOnDestroy(): void {
    console.log(`BookDetails.ngOnDestroy(), ${this.selectedBook}`);
  }

  save(): void {
    this.saveClicked.emit(this.formGroup.value);
  }

  cancel(): void {
    this.cancelClicked.emit();
  }
}
