import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Book} from "../../../model/book";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  @ViewChild("title")
  titleElement!: ElementRef<HTMLInputElement>;

  @ViewChild("author")
  authorElement!: ElementRef<HTMLInputElement>;

  @ViewChild("description")
  descriptionElement!: ElementRef<HTMLTextAreaElement>;

  @Input()
  selectedBook: Book | null = null;

  @Output()
  saveClicked = new EventEmitter<Book>()

  @Output()
  cancelClicked = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  save(): void {
    if (this.selectedBook != null) {
      const book: Book = {
        id: this.selectedBook.id,
        title: this.titleElement.nativeElement.value,
        author: this.authorElement.nativeElement.value,
        description: this.descriptionElement.nativeElement.value
      }
      this.saveClicked.emit(book);
    }
  }

  cancel(): void {
    this.cancelClicked.emit();
  }
}
