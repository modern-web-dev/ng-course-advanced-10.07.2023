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
    const inputElementOfId = (id: string) => nativeElement.querySelector(`input#${id}`) as HTMLInputElement;
    const titleElement = () => inputElementOfId("title") as HTMLInputElement;
    const authorElement = () => inputElementOfId("author") as HTMLInputElement;
    const descriptionElement = () => nativeElement.querySelector("textarea#description") as HTMLTextAreaElement;
    // "verbs"
    const clickBookAt = (position: number) => bookAt(position).dispatchEvent(new MouseEvent('click'));
    const clickCancel = () => cancelButton().dispatchEvent(new MouseEvent('click'));
    const clickSave = () => saveButton().dispatchEvent(new MouseEvent('click'));
    const detectChanges = () => fixture.detectChanges();
    const editField = (fieldElement: HTMLInputElement | HTMLTextAreaElement, value: string) => fieldElement.value = value;

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
      // given
      const position = 1;
      const book = bookService.getBooks()[position];
      // when
      clickBookAt(position);
      detectChanges();
      // then
      expect(testedComponent.selectedBook).toBeTruthy();
      expect(testedComponent.selectedBook).toEqual(book);
      expect(editor()).toBeTruthy();
      expect(titleElement().value).toEqual(book.title);
      expect(authorElement().value).toEqual(book.author);
      expect(descriptionElement().value).toEqual(book.description);
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

    it('it attempts to save unchanged selected book and close editor once save is clicked', () => {
      // given
      const position = 1;
      clickBookAt(position);
      const bookBeforeChange = bookService.getBooks()[position];
      detectChanges();
      expect(editor()).toBeTruthy();
      expect(testedComponent.selectedBook).toBeTruthy();
      // when
      clickSave();
      detectChanges();
      // then
      expect(editor()).toBeFalsy();
      expect(testedComponent.selectedBook).toBeNull();
      expect(bookService.getBooks()[position]).toEqual(bookBeforeChange);
    });

    it('saves a modified book', () => {
      // given
      spyOn(bookService, 'save').and.callThrough();
      const position = 1;
      clickBookAt(position);
      const bookBeforeChange = testedComponent.books[position];
      detectChanges();
      const newTitle = 'Foo';
      const newAuthor = 'Bar';
      const newDescription = 'Modified description';
      // when
      editField(titleElement(), newTitle);
      editField(authorElement(), newAuthor);
      editField(descriptionElement(), newDescription);
      clickSave();
      // detectChanges();
      // then
      expect(testedComponent.selectedBook).toBeFalsy();
      // expect(editor()).toBeFalsy();
      const modifiedBook = testedComponent.books[position];
      expect(modifiedBook).toBeTruthy();
      expect(bookService.save).toHaveBeenCalledWith({
        id: bookBeforeChange.id,
        title: newTitle,
        author: newAuthor,
        description: newDescription
      });
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
