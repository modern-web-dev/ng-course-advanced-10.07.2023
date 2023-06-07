import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BookDetailsComponent} from './book-details.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../shared/material.module";
import {Book} from "../../model/book";
import {Component} from "@angular/core";
import {ErrorMsgPipe} from "../../../../../../widgets/src/lib/pipes/error-msg.pipe";


@Component({
  selector: 'app-book-details-wrapper-test',
  template: '<app-book-details [book]="selectedBook"></app-book-details>'
})
class BookDetailsWrapperTestComponent {

  selectedBook: Book | null = null;
}

describe('BookDetailsComponent', () => {
  let component: BookDetailsWrapperTestComponent;
  let fixture: ComponentFixture<BookDetailsWrapperTestComponent>;
  let nativeElement: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookDetailsWrapperTestComponent, BookDetailsComponent, ErrorMsgPipe],
      imports: [ReactiveFormsModule, MaterialModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookDetailsWrapperTestComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  // test utility functions
  // "nouns"
  const editor = () => nativeElement.querySelector('#editor') as HTMLElement;
  const saveButton = () => nativeElement.querySelector("button#save") as HTMLButtonElement;
  const cancelButton = () => nativeElement.querySelector("button#cancel") as HTMLButtonElement;
  const inputElementOfId = (id: string) => nativeElement.querySelector(`input#${id}`) as HTMLInputElement;
  const titleElement = () => inputElementOfId("title") as HTMLInputElement;
  const authorElement = () => inputElementOfId("author") as HTMLInputElement;
  const descriptionElement = () => nativeElement.querySelector("textarea#description") as HTMLTextAreaElement;
  // "verbs"
  const clickCancel = () => cancelButton().dispatchEvent(new MouseEvent('click'));
  const clickSave = () => saveButton().dispatchEvent(new MouseEvent('click'));
  const detectChanges = () => fixture.detectChanges();
  const editField = (fieldElement: HTMLInputElement | HTMLTextAreaElement, value: string) => {
    fieldElement.value = value;
    fieldElement.dispatchEvent(new Event('input'));
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill with book once book is set', () => {
    // given
    const book: Book = {
      id: 123,
      title: 'foo',
      author: 'bar',
      description: 'some description'
    }
    // when
    component.selectedBook = book;
    detectChanges();
    // then
    expect(titleElement().value).toEqual(book.title);
    expect(authorElement().value).toEqual(book.author);
    expect(descriptionElement().value).toEqual(book.description);
  });
});
