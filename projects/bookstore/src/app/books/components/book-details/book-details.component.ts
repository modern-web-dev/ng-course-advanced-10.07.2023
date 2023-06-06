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
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input()
  book: Book | null = null;

  @Output()
  cancelClicked = new EventEmitter<void>();
  @Output()
  saveClicked = new EventEmitter<Book>();

  formGroup: FormGroup;

  constructor() {
    console.log('BookDetailsComponent:constructor');
    this.formGroup = new FormGroup({
      id: new FormControl(),
      title: new FormControl(),
      author: new FormControl(),
      description: new FormControl()
    });
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

    const bookChange = changes['book'];
    if(bookChange) {
      // const obj = {...changes['book'].currentValue};
      // delete obj.id;
      if (bookChange.currentValue) {
        this.formGroup.setValue(bookChange.currentValue);
      } else {
        this.formGroup.reset();
      }
    }
  }

  ngAfterViewInit() {
    console.log('BookDetailsComponent:ngAfterViewInit');
  }

  save(): void {
    if (this.book) {
      this.saveClicked.emit(this.formGroup.value);
    }
  }
}
