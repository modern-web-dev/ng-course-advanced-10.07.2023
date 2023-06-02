import {BookListComponent} from "./book-list.component";
import {BookService} from "../../services/book.service";


describe("BookListComponent", () => {

  let component: BookListComponent;

  let service: BookService;

  beforeEach(() => {
    service = new BookService();
    component = new BookListComponent(service);
  });

  it('has no selected book initially', () => {
    expect(component.selectedBook).toBeFalsy();
  });

  it('has three books on the list', () => {
    expect(component.books).toHaveSize(3);
  })

  it('has books the same as in service', () => {
    expect(component.books).toEqual(service.getBooks());
  });

});
