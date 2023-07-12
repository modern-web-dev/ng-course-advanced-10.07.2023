import { TestBed } from '@angular/core/testing';

import { BooksService } from './books.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

describe('BooksService', () => {
  let service: BooksService;
  let httpClientMock: SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientMock = createSpyObj("HttpClient", ["get", "put"]);
    TestBed.configureTestingModule({
      providers: [BooksService, { provide: HttpClient, useValue: httpClientMock}]
    });
    service = TestBed.inject(BooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
