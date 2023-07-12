import {BookListComponent} from "./book-list.component";
import {BooksService} from "../../services/books.service";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MaterialModule} from "../../../shared/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BookDetailsComponent} from "./book-details/book-details.component";
import {ReactiveFormsModule} from "@angular/forms";
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import {SharedModule} from "../../../shared/shared.module";
import {of} from "rxjs";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {INITIAL_BOOKS_STATE} from "../../store/books.reducer";
import {BooksSelector} from "../../store/books.selectors";
import {ofType} from "@ngrx/effects";
import {saveBookAction} from "../../store/books.actions";
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
  let testedComponent: BookListComponent;

  beforeEach(() => {
    bookServiceMock = createSpyObj('BooksService', ['getBooks', 'save']);
    bookServiceMock.getBooks.and.returnValue(of(booksTestData()));
  });

  describe('[DOM]', () => {

    let fixture: ComponentFixture<BookListComponent>;
    let nativeElement: any;
    let storeMock: MockStore;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BookListComponent, BookDetailsComponent],
        imports: [MaterialModule, BrowserAnimationsModule, ReactiveFormsModule, SharedModule],
        providers: [
          provideMockStore({
            initialState: INITIAL_BOOKS_STATE,
            selectors: [
              {selector: BooksSelector.getBooks, value: booksTestData()},
              {selector: BooksSelector.getSelectedBook, value: null}
            ]
          })
        ]
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
      storeMock = TestBed.inject(MockStore);
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
      const position = 1
      const book = booksTestData()[position];
      clickAt(bookAt(1));
      storeMock.overrideSelector(BooksSelector.getSelectedBook, book);
      storeMock.refreshState();
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
      const position = 1;
      const book = booksTestData()[position];
      storeMock.overrideSelector(BooksSelector.getSelectedBook, book);
      storeMock.refreshState();
      clickAt(bookAt(position));
      detectChanges();
      expect(editor()).toBeTruthy();
      expect(editorButtons()).toBeTruthy();
      // when
      clickAt(cancelButton());
      storeMock.overrideSelector(BooksSelector.getSelectedBook, null);
      storeMock.refreshState();
      detectChanges();
      // then
      expect(editor()).toBeFalsy();
      expect(editorButtons()).toBeFalsy();
    });

    it('save cannot be clicked if there are no changes in the form', () => {
      // given
      const position = 1;
      const book = booksTestData()[position];
      storeMock.overrideSelector(BooksSelector.getSelectedBook, book);
      storeMock.refreshState();
      // when
      clickAt(bookAt(position));
      detectChanges();
      expect(editor()).toBeTruthy();
      expect(editorButtons()).toBeTruthy();
      // then
      expect(saveButton().disabled).toBeTruthy();
    });

    it('saves a changed book and closes the editor once save is clicked', (done) => {
      // given
      const newTitle = "foo";
      const newAuthor = "bar";
      const newDescription = "1234";
      const bookAfterUpdate = {
        id: 2,
        title: newTitle,
        author: newAuthor,
        description: newDescription
      };
      storeMock.scannedActions$.pipe(ofType(saveBookAction)).subscribe(action => {
        expect(action.book).toEqual(bookAfterUpdate);
        done();
      });
      const position = 1;
      const book = booksTestData()[position];
      storeMock.overrideSelector(BooksSelector.getSelectedBook, book);
      storeMock.refreshState();
      clickAt(bookAt(position));
      detectChanges(); // selectedBook is not null now
      expect(saveButton().disabled).toBeTruthy();
      // when
      editField(titleElement(), newTitle);
      editField(authorElement(), newAuthor);
      editField(descriptionElement(), newDescription);
      detectChanges();
      expect(saveButton().disabled).toBeFalsy();
      clickAt(saveButton());
      storeMock.overrideSelector(BooksSelector.getSelectedBook, null);
      storeMock.refreshState();
      detectChanges(); // no book is selected now, book list is refreshed
      // then
      expect(editor()).toBeFalsy();
      expect(editorButtons()).toBeFalsy();
    });
  });

  // seems to be redundant
  xdescribe('[class]', () => {

    let storeMock: any;

    beforeEach(() => {
      storeMock = {
        pipe: createSpy(),
        dispatch: createSpy()
      };
      testedComponent = new BookListComponent(storeMock);
    });

    it('initially no book is selected', () => {
      // expect(testedComponent.selectedBook).toBeNull();
    });

    it('has books$ initialized with a list of three', (done) => {
      storeMock.pipe.and.returnValue(of(booksTestData));
      testedComponent.books$.subscribe( books => {
        expect(books).toHaveSize(3);
        done();
      });
    });

    // seems to be redundant
    it('can select a book', (done) => {
      storeMock.pipe.and.returnValue(of(booksTestData));
      testedComponent.books$.subscribe(books => {
        const bookToBeSelected = books[1];
        testedComponent.selectBook(bookToBeSelected);
        // expect(testedComponent.selectedBook).toEqual(bookToBeSelected);
        done();
      })
    });
  });
});
