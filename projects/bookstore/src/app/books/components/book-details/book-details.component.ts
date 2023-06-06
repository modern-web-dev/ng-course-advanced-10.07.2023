import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
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
  @Output()
  cancelClicked = new EventEmitter<void>();
  @Output()
  saveClicked = new EventEmitter<Book>();

  @ViewChild("title")
  titleElement!: ElementRef<HTMLInputElement>;

  @ViewChild("author")
  authorElement!: ElementRef<HTMLInputElement>;

  @ViewChild("description")
  descriptionElement!: ElementRef<HTMLTextAreaElement>;

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
  }

  ngAfterViewInit() {
    console.log('BookDetailsComponent:ngAfterViewInit');
  }

  save(): void {
    if (this.book) {
      const book: Book = {
        id: this.book.id,
        title: this.titleElement.nativeElement.value,
        author: this.authorElement.nativeElement.value,
        description: this.descriptionElement.nativeElement.value
      };
      this.saveClicked.emit(book);
    }
  }
}
