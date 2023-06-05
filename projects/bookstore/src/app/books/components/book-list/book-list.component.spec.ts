import {BookListComponent} from "./book-list.component";
import {BooksService} from "../../services/books.service";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MaterialModule} from "../../../shared/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


describe('BookListComponent', () => {

  let testedComponent: BookListComponent;

  describe('[DOM]', () => {

    let fixture: ComponentFixture<BookListComponent>;
    let nativeElement: any;
    let bookService: BooksService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BookListComponent],
        imports: [MaterialModule],
        providers: [BooksService]
      }).compileComponents();
    });

    // test utility functions
    // "nouns"
    const bookList = () => nativeElement.querySelectorAll('li.clickable') as NodeList;
    const editor = () => nativeElement.querySelector('#editor') as HTMLElement;
    const bookAt = (position: number) => bookList().item(position) as HTMLLIElement;
    const saveButton = () => nativeElement.querySelector("button#save") as HTMLButtonElement;
    const cancelButton = () => nativeElement.querySelector("button#cancel") as HTMLButtonElement;
    // "verbs"
    const clickBookAt = (position: number) => bookAt(position).dispatchEvent(new MouseEvent('click'));
    const clickCancel = () => cancelButton().dispatchEvent(new MouseEvent('click'));
    const clickSave = () => saveButton().dispatchEvent(new MouseEvent('click'));
    const detectChanges = () => fixture.detectChanges();

    beforeEach(() => {
      fixture = TestBed.createComponent(BookListComponent);
      testedComponent = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
      bookService = TestBed.inject(BooksService);
      detectChanges();
    });

    it('can be created', () => {
      expect(testedComponent).toBeTruthy();
    });

    it('does not show editor initially', () => {
      expect(editor()).toBeFalsy();
    });

    it('displays three books', () => {
      expect(bookList().length).toEqual(3);
    });

    it('shows an editor once a book is clicked', () => {
      // when
      clickBookAt(1);
      detectChanges();
      // then
      expect(testedComponent.selectedBook).toBeTruthy();
      expect(editor()).toBeTruthy();
    });

    it('it closes editor once cancel button is clicked', () => {
      // given
      clickBookAt(1);
      detectChanges();
      expect(editor()).toBeTruthy();
      expect(testedComponent.selectedBook).toBeTruthy();
      // when
      clickCancel();
      detectChanges();
      // then
      expect(editor()).toBeFalsy();
      expect(testedComponent.selectedBook).toBeNull();
    });

    it('it saves unchanged selected book and close editor once save is clicked', () => {
      // given
      const bookNo = 1;
      clickBookAt(bookNo);
      const bookBeforeChange = bookService.getBooks()[bookNo];
      detectChanges();
      expect(editor()).toBeTruthy();
      expect(testedComponent.selectedBook).toBeTruthy();
      // when
      clickSave();
      detectChanges();
      // then
      expect(editor()).toBeFalsy();
      expect(testedComponent.selectedBook).toBeNull();
      expect(bookService.getBooks()[bookNo]).toEqual(bookBeforeChange);
    });
  });

  describe('[class]', () => {
    let bookService: BooksService;

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
});
