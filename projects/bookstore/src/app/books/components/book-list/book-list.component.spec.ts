import {BookListComponent} from "./book-list.component";
import {BooksService} from "../../services/books.service";


describe('BookListComponent', () => {

  let bookService: BooksService;
  let testedComponent: BookListComponent;

  beforeEach(() => {
    bookService = new BooksService();
    testedComponent = new BookListComponent(bookService);
  });

  it('has no selected book initially', () => {
    expect(testedComponent.selectedBook).toBeNull();
  });

  it('has three books on the list', () => {
    expect(testedComponent.books).toHaveSize(3);
  });

  it('has books identical to the ones in the service', () => {
    expect(testedComponent.books).toEqual(bookService.getBooks());
  })
});
