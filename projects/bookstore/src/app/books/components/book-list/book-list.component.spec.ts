import {BookListComponent} from "./book-list.component";
import {BooksService} from "../../services/books.service";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MaterialModule} from "../../../shared/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


describe('BookListComponent', () => {

  let bookService: BooksService;
  let testedComponent: BookListComponent;

  describe('[DOM]', () => {

    let fixture: ComponentFixture<BookListComponent>;
    let nativeElement: any;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BookListComponent],
        imports: [MaterialModule, BrowserAnimationsModule],
        providers: [BooksService]
      })
      .compileComponents();
    });

    // test utility functions
    // "nouns"
    const editor = () => nativeElement.querySelector('#editor') as HTMLElement;
    const editorButtons = () => nativeElement.querySelector('#editor-buttons') as HTMLDivElement;
    const booksList = () => nativeElement.querySelectorAll("li") as NodeList;
    const bookAt = (position: number) => booksList().item(position) as HTMLLIElement;

    // "verbs"
    const detectChanges = () => fixture.detectChanges();
    const clickAt = (element: HTMLElement) => element.dispatchEvent(new MouseEvent('click'));

    beforeEach(() => {
      fixture = TestBed.createComponent(BookListComponent);
      testedComponent = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
      detectChanges();
    });

    it('can be created', () => {
      expect(testedComponent).toBeTruthy();
    });

    it('keeps the editor hidden initially', () => {
      expect(editor()).toBeFalsy();
      expect(editorButtons()).toBeFalsy();
    });

    it('shows up the editor', () => {
      // given
      expect(editor()).toBeFalsy();
      expect(editorButtons()).toBeFalsy();

      // when
      clickAt(bookAt(1));
      detectChanges();

      // then
      expect(editor()).toBeTruthy();
      expect(editorButtons()).toBeTruthy();
    });

    it('displays three books', () => {
      expect(booksList().length).toEqual(3);
    });
  });

  describe('[class]', () => {

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
