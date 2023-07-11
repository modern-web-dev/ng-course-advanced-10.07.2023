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
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {


  @Input()
  selectedBook!: Book;

  formGroup: FormGroup;

  titleControl: FormControl;

  authorControl: FormControl;

  descriptionControl: FormControl;

  @Output()
  saveClicked = new EventEmitter<Book>()

  @Output()
  cancelClicked = new EventEmitter<void>();

  constructor() {
    console.log('BookDetails.constructor()');

    this.titleControl = new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]);
    this.authorControl = new FormControl('', [Validators.required, Validators.maxLength(15)]);
    this.descriptionControl = new FormControl('', [Validators.maxLength(100)]);
    this.formGroup = new FormGroup({
      id: new FormControl(),
      title: this.titleControl,
      author: this.authorControl,
      description: this.descriptionControl
    }, {updateOn: "change"});
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
      this.formGroup.reset(newBook);
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
