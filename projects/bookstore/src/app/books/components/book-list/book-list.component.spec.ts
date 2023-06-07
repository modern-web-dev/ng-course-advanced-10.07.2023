import {BookListComponent} from "./book-list.component";
import {BooksService} from "../../services/books.service";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MaterialModule} from "../../../shared/material.module";
import {BookDetailsComponent} from "../book-details/book-details.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ErrorMsgPipe} from "../../../../../../widgets/src/lib/pipes/error-msg.pipe";
import {books} from "../../services/test-books";
import {of} from "rxjs";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {BooksState, INITIAL_BOOKS_STATE} from "../../store/books.reducer";
import {Store} from "@ngrx/store";


describe('BookListComponent', () => {

  let testedComponent: BookListComponent;
  let booksServiceMock: any;
  let initialState: BooksState;

  beforeEach(() => {
    booksServiceMock = {
      getBooks: jasmine.createSpy().and.returnValue(of(books())),
      save: jasmine.createSpy().and.returnValue(of(books()[1]))
    };
  });

  describe('[DOM]', () => {

    let fixture: ComponentFixture<BookListComponent>;
    let nativeElement: any;
    let store: MockStore;

    beforeEach(async () => {

      initialState = {
        books: [],
        selectedBook: null
      }

      await TestBed.configureTestingModule({
        declarations: [BookListComponent, BookDetailsComponent, ErrorMsgPipe],
        imports: [MaterialModule, ReactiveFormsModule],
        providers: [
          {provide: BooksService, useValue: booksServiceMock},
          provideMockStore({ initialState: INITIAL_BOOKS_STATE })
        ]
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
    const editField = (fieldElement: HTMLInputElement | HTMLTextAreaElement, value: string) => {
      fieldElement.value = value;
      fieldElement.dispatchEvent(new Event('input'));
    }

    beforeEach(() => {
      store = TestBed.inject(MockStore);
      fixture = TestBed.createComponent(BookListComponent);
      testedComponent = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
      detectChanges();
    });

    it('can be created', () => {
      expect(testedComponent).toBeTruthy();
    });

    it('does not show editor initially', () => {
      expect(editor()).toBeFalsy();
    });

    it('displays three books', () => {
      store.setState({ books: books(), selectedBook: null });
      expect(bookList().length).toEqual(3);
    });

    it('shows an editor once a book is clicked', () => {
      // given
      const position = 1;
      const book = books()[position];
      // when
      clickBookAt(position);
      detectChanges();
      // then
      expect(testedComponent.selectedBook$).toBeTruthy();
      // expect(testedComponent.selectedBook$).toEqual(book);
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
      expect(testedComponent.selectedBook$).toBeTruthy();
      // when
      clickCancel();
      detectChanges();
      // then
      expect(editor()).toBeFalsy();
      expect(testedComponent.selectedBook$).toBeNull();
    });

    it('save button for unchanged book is disabled', () => {
      // given
      const position = 1;
      clickBookAt(position);
      const bookBeforeChange = booksServiceMock.getBooks()[position];
      detectChanges();
      expect(editor()).toBeTruthy();
      expect(testedComponent.selectedBook$).toBeTruthy();
      // when
      // then
      expect(saveButton().disabled).toBeTruthy();
    });

    it('saves a modified book', () => {
      // given
      const position = 1;
      clickBookAt(position);
      const bookBeforeChange = books()[position];
      detectChanges();
      const newTitle = 'Foo';
      const newAuthor = 'Bar';
      const newDescription = 'Modified description';

      expect(titleElement().value).toEqual(bookBeforeChange.title);
      expect(authorElement().value).toEqual(bookBeforeChange.author);
      expect(descriptionElement().value).toEqual(bookBeforeChange.description);

      // when
      editField(titleElement(), newTitle);
      editField(authorElement(), newAuthor);
      editField(descriptionElement(), newDescription);
      detectChanges();
      clickSave();
      // then
      expect(testedComponent.selectedBook$).toBeFalsy();
      expect(booksServiceMock.save).toHaveBeenCalledWith({
        id: bookBeforeChange.id,
        title: newTitle,
        author: newAuthor,
        description: newDescription
      });
    });
  });

  describe('[class]', () => {

    beforeEach(() => {
      testedComponent = new BookListComponent(booksServiceMock);
    });

    it('has no selected book initially', () => {
      expect(testedComponent.selectedBook$).toBeNull();
    });

    it('has three books on the list', (done) => {
      testedComponent.books$.subscribe((books) => {
        expect(books).toHaveSize(3);
        done();
      });
    });

    it('has books identical to the ones in the service', (done) => {
      testedComponent.books$.subscribe((resolvedBooks) => {
        expect(resolvedBooks).toEqual(books());
        done();
      })

    })
  });
});
