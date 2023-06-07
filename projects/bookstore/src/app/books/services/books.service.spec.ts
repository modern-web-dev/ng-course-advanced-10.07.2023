import { BooksService } from './books.service';
import {TestBed} from "@angular/core/testing";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {of} from "rxjs";
import {books} from "./test-books";

describe('BooksService', () => {
  let service: BooksService;
  let httpClientMock: any;

  beforeEach(() => {

    httpClientMock = {
      get: () => of(books())
    };

    TestBed.configureTestingModule({
      providers: [
        BooksService,
        { provide: HttpClient, useValue: httpClientMock }
      ]
    })
    // service = new BooksService();
    service = TestBed.inject(BooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of books', (done) => {
    const books$ = service.getBooks();
    return books$.subscribe(books => {
      expect(books).toHaveSize(3);
      done();
    });
  });
});
