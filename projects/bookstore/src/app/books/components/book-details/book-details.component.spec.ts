import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsComponent } from './book-details.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../shared/material.module";

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDetailsComponent ],
      imports: [ ReactiveFormsModule, MaterialModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
