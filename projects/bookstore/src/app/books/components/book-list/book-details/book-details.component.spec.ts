import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BookDetailsComponent} from './book-details.component';
import {MaterialModule} from "../../../../shared/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Component, ViewChild} from "@angular/core";
import {Book} from "../../../model/book";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-test-component',
  template: '<app-book-details *ngIf="book" [selectedBook]="book"></app-book-details>'
})
class TestComponent {

  @ViewChild(BookDetailsComponent)
  bookDetailsComponent!: BookDetailsComponent;

  book: Book | null = null;
}

const testData = () => ({
  id: 1,
  title: 'foo',
  author: 'bar',
  description: '1234'
});

describe('BookDetailsComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, BookDetailsComponent],
      imports: [MaterialModule, BrowserAnimationsModule, ReactiveFormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.bookDetailsComponent).toBeFalsy();
  });

  it('should show details on non null book', () => {
    component.book = testData();
    fixture.detectChanges();
    expect(component.bookDetailsComponent).toBeTruthy();
    expect(component.bookDetailsComponent.selectedBook).toEqual(testData());
  });
});
