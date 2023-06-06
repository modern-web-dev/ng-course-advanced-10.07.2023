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
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  titleFormControl: FormControl;
  authorFormControl: FormControl;
  descriptionFormControl: FormControl;

  constructor() {
    console.log('BookDetailsComponent:constructor');
    this.titleFormControl = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]);
    this.authorFormControl = new FormControl('', [Validators.required]);
    this.descriptionFormControl = new FormControl('', [Validators.maxLength(500)]);
    this.formGroup = new FormGroup({
      id: new FormControl(),
      title: this.titleFormControl,
      author: this.authorFormControl,
      description: this.descriptionFormControl
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
    if (bookChange) {
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
