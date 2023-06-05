import { BooksService } from './books.service';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(() => {
    service = new BooksService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
