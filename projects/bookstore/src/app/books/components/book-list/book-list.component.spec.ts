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
    const cancelButton = () => nativeElement.querySelector('#cancel') as HTMLButtonElement;
    const saveButton = () => nativeElement.querySelector('#save') as HTMLButtonElement;
    const titleElement = () => nativeElement.querySelector('input#title') as HTMLInputElement;
    const authorElement = () => nativeElement.querySelector('input#author') as HTMLInputElement;
    const descriptionElement = () => nativeElement.querySelector('textarea#description') as HTMLTextAreaElement;

    // "verbs"
    const detectChanges = () => fixture.detectChanges();
    const clickAt = (element: HTMLElement) => element.dispatchEvent(new MouseEvent('click'));
    const editField = (element: HTMLInputElement | HTMLTextAreaElement, value: string) =>
      element.value = value;

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

    it('closes an editor when cancel is clicked', () => {
      // given
      clickAt(bookAt(1));
      detectChanges();
      expect(editor()).toBeTruthy();
      expect(editorButtons()).toBeTruthy();
      // when
      clickAt(cancelButton());
      detectChanges();
      // then
      expect(editor()).toBeFalsy();
      expect(editorButtons()).toBeFalsy();
    });

    it('closes an editor when save is clicked', () => {
      // given
      clickAt(bookAt(1));
      detectChanges();
      expect(editor()).toBeTruthy();
      expect(editorButtons()).toBeTruthy();
      // when
      clickAt(saveButton());
      detectChanges();
      // then
      expect(editor()).toBeFalsy();
      expect(editorButtons()).toBeFalsy();
    });

    it('saves a changed book and closes the editor once save is clicked', () => {
      // given
      const oldBooks = testedComponent.books;
      clickAt(bookAt(1));
      detectChanges(); // selectedBook is not null now
      // when
      editField(titleElement(), "foo");
      editField(authorElement(), "bar");
      editField(descriptionElement(), "1234");
      clickAt(saveButton());
      detectChanges(); // no book is selected now, book list is refreshed
      // then
      expect(editor()).toBeFalsy();
      expect(editorButtons()).toBeFalsy();
      const newBooks = testedComponent.books;
      expect(newBooks).not.toEqual(oldBooks);
      expect(newBooks[1]).toEqual({
        id: 2,
        title: 'foo',
        author: 'bar',
        description: '1234'
      });
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
