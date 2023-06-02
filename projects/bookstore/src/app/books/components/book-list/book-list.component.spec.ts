import {BookListComponent} from "./book-list.component";
import {BookService} from "../../services/book.service";
import {ComponentFixture, TestBed} from "@angular/core/testing";


describe("BookListComponent", () => {

  let component: BookListComponent;

  describe("[DOM]", () => {
    let fixture: ComponentFixture<BookListComponent>;
    let bookService: BookService;
    let nativeElement: any;

    // test utility functions
    // nouns
    const bookList = () => nativeElement.querySelectorAll('li.clickable') as NodeList;
    const editor = () => nativeElement.querySelector('#editor') as HTMLElement;
    const bookAt = (position: number) => bookList().item(position) as HTMLLIElement;
    const titleElement = () => nativeElement.querySelector('#title') as HTMLInputElement;
    const authorElement = () => nativeElement.querySelector('#author') as HTMLInputElement;
    const descriptionElement = () => nativeElement.querySelector('#description') as HTMLTextAreaElement;
    const cancelButton = () => nativeElement.querySelector('#cancel') as HTMLButtonElement;
    const saveButton = () => nativeElement.querySelector('#save') as HTMLButtonElement;
    // verbs
    const clickBookAt = (position: number) => bookAt(position).dispatchEvent(new MouseEvent('click'));
    const detectChanges = () => fixture.detectChanges();
    const clickCancel = () => cancelButton().dispatchEvent(new MouseEvent('click'));
    const clickSave = () => saveButton().dispatchEvent(new MouseEvent('click'));
    const editField = (field: HTMLInputElement | HTMLTextAreaElement, value: string) => field.value = value;

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
      bookService = TestBed.inject(BookService);
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
      const book = component.selectedBook;
      expect(editor()).toBeTruthy();
      expect(titleElement().value).toBe(book!!.title);
      expect(authorElement().value).toBe(book!!.author);
      expect(descriptionElement().value).toBe(book!!.description);
    });

    it('closes editor once cancel is clicked', () => {
      // given
      expect(bookList().length).toEqual(3);
      expect(editor()).toBeFalsy();
      clickBookAt(1);
      detectChanges();
      expect(editor()).toBeTruthy();
      // when
      clickCancel();
      detectChanges();
      // then
      expect(editor()).toBeFalsy();
    });

    it('saves a modified book', () => {
      // given
      expect(editor()).toBeFalsy();
      clickBookAt(1);
      detectChanges();
      expect(editor()).toBeTruthy();
      // when
      editField(titleElement(), 'foo');
      editField(authorElement(), 'bar');
      editField(descriptionElement(), 'some other description');
      clickSave();
      detectChanges();
      // then
      expect(editor()).toBeFalsy();
      const modifiedBook = bookService.getBooks()[1];
      expect(modifiedBook).toBeTruthy();
      expect(modifiedBook.title).toBe('foo');
      expect(modifiedBook.author).toBe('bar');
      expect(modifiedBook.description).toBe('some other description');
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
