import {BookListComponent} from "./book-list.component";
import {BooksService} from "../../services/books.service";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MaterialModule} from "../../../shared/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BookDetailsComponent} from "./book-details/book-details.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {of, Subject} from "rxjs";
import {BooksFacadeService} from "../../store/books-facade.service";
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import {Book} from "../../model/book";
import createSpy = jasmine.createSpy;

const booksTestData = () => [{
  id: 1,
  title: 'Solaris',
  author: 'Stanisław Lem',
  description: 'Solaris chronicles the ultimate futility of attempted communications with the extraterrestrial life inhabiting a distant alien planet named Solaris. The planet is almost completely covered with an ocean of gel that is revealed to be a single, planet-encompassing entity. Terran scientists conjecture it is a living and a sentient being, and attempt to communicate with it.'
}, {
  id: 2,
  title: '2001: A Space Odyssey',
  author: 'Aurthur C. Clarke',
  description: 'A mysterious alien civilization uses a tool with the appearance of a large crystalline monolith to investigate worlds across the galaxy and, if possible, to encourage the development of intelligent life. The book shows one such monolith appearing in prehistoric Africa, 3 million years ago (in the movie, 4 mya), where it inspires a starving group of hominids to develop tools. The hominids use their tools to kill animals and eat meat, ending their starvation. They then use the tools to kill a leopard preying on them; the next day, the main ape character, Moon-Watcher, uses a club to kill the leader of a rival tribe. The book suggests that the monolith was instrumental in awakening intelligence.'
}, {
  id: 3,
  title: 'Ubik',
  author: 'Phillip K. Dick',
  description: 'By the year 1992, humanity has colonized the Moon and psychic powers are common. The protagonist, Joe Chip, is a debt-ridden technician working for Runciter Associates, a "prudence organization" employing "inertials"—people with the ability to negate the powers of telepaths and "precogs"—to enforce the privacy of clients. The company is run by Glen Runciter, assisted by his deceased wife Ella who is kept in a state of "half-life", a form of cryonic suspension that allows the deceased limited consciousness and ability to communicate. While consulting with Ella, Runciter discovers that her consciousness is being invaded by another half-lifer named Jory Miller.'
}];

describe('BookListComponent', () => {

  let bookServiceMock: SpyObj<BooksService>;
  let booksFacadeServiceMock: any;

  let testedComponent: BookListComponent;

  beforeEach(() => {
    bookServiceMock = createSpyObj('BooksService', ['getBooks', 'save']);
    bookServiceMock.getBooks.and.returnValue(of(booksTestData()));

    booksFacadeServiceMock = {
      books$: new Subject<Book[]>(),
      selectedBook$: new Subject<Book | null>(),
      loadBooks: createSpy(),
      queryBooks: createSpy(),
      selectBook: createSpy(),
      deselectBook: createSpy(),
      save: createSpy()
    };
  });

  describe('[DOM]', () => {

    let fixture: ComponentFixture<BookListComponent>;
    let nativeElement: any;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BookListComponent, BookDetailsComponent],
        imports: [MaterialModule, BrowserAnimationsModule, ReactiveFormsModule, SharedModule],
        providers: [{provide: BooksFacadeService, useValue: booksFacadeServiceMock}]
      }).compileComponents();
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
    const editField = (element: HTMLInputElement | HTMLTextAreaElement, value: string) => {
      element.value = value;
      element.dispatchEvent(new Event('input'));
    }

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
      booksFacadeServiceMock.books$.next(booksTestData());
      detectChanges();

      // when
      const position = 1
      const book = booksTestData()[position];
      clickAt(bookAt(1));
      booksFacadeServiceMock.selectedBook$.next(book);
      detectChanges();

      // then
      expect(editor()).toBeTruthy();
      expect(editorButtons()).toBeTruthy();
      expect(booksFacadeServiceMock.selectBook).toHaveBeenCalledWith(book);
    });

    it('displays three books', () => {
      // when
      booksFacadeServiceMock.books$.next(booksTestData());
      detectChanges();
      // then
      expect(booksList().length).toEqual(3);
    });

    it('closes an editor when cancel is clicked', () => {
      // given
      booksFacadeServiceMock.books$.next(booksTestData());
      detectChanges();
      const position = 1;
      const book = booksTestData()[position];
      clickAt(bookAt(position));
      booksFacadeServiceMock.selectedBook$.next(book);
      detectChanges();
      expect(editor()).toBeTruthy();
      expect(editorButtons()).toBeTruthy();
      // when
      clickAt(cancelButton());
      booksFacadeServiceMock.selectedBook$.next(null);
      detectChanges();
      // then
      expect(editor()).toBeFalsy();
      expect(editorButtons()).toBeFalsy();
      expect(booksFacadeServiceMock.selectBook).toHaveBeenCalledOnceWith(book);
      expect(booksFacadeServiceMock.deselectBook).toHaveBeenCalledOnceWith();
    });

    it('save cannot be clicked if there are no changes in the form', () => {
      // given
      booksFacadeServiceMock.books$.next(booksTestData());
      detectChanges();
      const position = 1;
      const book = booksTestData()[position];
      // when
      clickAt(bookAt(position));
      booksFacadeServiceMock.selectedBook$.next(book);
      detectChanges();
      expect(editor()).toBeTruthy();
      expect(editorButtons()).toBeTruthy();
      // then
      expect(saveButton().disabled).toBeTruthy();
    });

    it('saves a changed book and closes the editor once save is clicked', () => {
      // given
      booksFacadeServiceMock.books$.next(booksTestData());
      detectChanges();
      const newTitle = "foo";
      const newAuthor = "bar";
      const newDescription = "1234";
      const bookAfterUpdate = {
        id: 2,
        title: newTitle,
        author: newAuthor,
        description: newDescription
      };
      const position = 1;
      const book = booksTestData()[position];
      clickAt(bookAt(position));
      booksFacadeServiceMock.selectedBook$.next(book);
      detectChanges(); // selectedBook is not null now
      expect(saveButton().disabled).toBeTruthy();
      // when
      editField(titleElement(), newTitle);
      editField(authorElement(), newAuthor);
      editField(descriptionElement(), newDescription);
      detectChanges();
      expect(saveButton().disabled).toBeFalsy();
      clickAt(saveButton());
      booksFacadeServiceMock.selectedBook$.next(null);
      detectChanges(); // no book is selected now, book list is refreshed
      // then
      expect(editor()).toBeFalsy();
      expect(editorButtons()).toBeFalsy();
    });
  });
});
