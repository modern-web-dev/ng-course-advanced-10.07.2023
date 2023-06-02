import {BookListComponent} from "./book-list.component";
import {BookService} from "../../services/book.service";
import {ComponentFixture, TestBed} from "@angular/core/testing";


describe("BookListComponent", () => {

  let component: BookListComponent;

  describe("[DOM]", () => {
    let fixture: ComponentFixture<BookListComponent>;
    let nativeElement: any;

    // test utility functions
    // nouns
    const bookList = () => nativeElement.querySelectorAll('li.clickable') as NodeList;
    const editor = () => nativeElement.querySelector('#editor') as HTMLElement;
    const bookAt = (position: number) => bookList().item(position) as HTMLLIElement;
    // verbs
    const clickBookAt = (position: number) => bookAt(position).dispatchEvent(new MouseEvent('click'));
    const detectChanges = () => fixture.detectChanges();

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BookListComponent],
        providers: [BookService]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BookListComponent);
      component = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
      detectChanges();
    });

    it('can be created', () => {
      expect(component).toBeTruthy();
    })

    it('shows an editor once a book is clicked', () => {
      // given
      expect(bookList().length).toEqual(3);
      expect(editor()).toBeFalsy();
      // when
      clickBookAt(1);
      detectChanges();
      // then
      expect(component.selectedBook).toBeTruthy();
      expect(editor()).toBeTruthy();
    });
  });

  describe("[class]", () => {

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
});
