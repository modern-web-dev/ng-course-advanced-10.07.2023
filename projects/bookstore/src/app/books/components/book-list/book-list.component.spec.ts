import {BookListComponent} from "./book-list.component";
import {BooksService} from "../../services/books.service";


describe('BookListComponent', () => {

  let bookService: BooksService;
  let testedComponent: BookListComponent;

  describe("[class]", () => {

    beforeEach(() => {
      bookService = new BooksService();
      testedComponent = new BookListComponent(bookService);
    });

    it('initially no book is selected', () => {
      expect(testedComponent.selectedBook).toBeNull();
    });

    it('has three books on the list', () => {
      expect(testedComponent.books).toHaveSize(3);
    });

    it('can select a book', () => {
      const bookToBeSelected = testedComponent.books[1];
      testedComponent.selectBook(bookToBeSelected);
      expect(testedComponent.selectedBook).toEqual(bookToBeSelected);
    });
  });
});
