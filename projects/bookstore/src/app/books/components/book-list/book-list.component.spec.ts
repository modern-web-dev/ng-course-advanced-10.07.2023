import {BookListComponent} from "./book-list.component";
import {BookService} from "../../services/book.service";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Book} from "../../model/book";


describe("BookListComponent", () => {

  let component: BookListComponent;

  describe("[DOM]", () => {
    let fixture: ComponentFixture<BookListComponent>;
    let bookService: any;
    let nativeElement: any;
    let books: Book[];

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

      books = [{
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

      bookService = {
        getBooks: jasmine.createSpy().and.returnValue(books),
        saveBook: jasmine.createSpy()
      };

      await TestBed.configureTestingModule({
        declarations: [BookListComponent],
        providers: [{ provide: BookService, useValue: bookService }]
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
      expect(bookService.saveBook).toHaveBeenCalledOnceWith({
        id: 2,
        title: 'foo',
        author: 'bar',
        description: 'some other description'
      });
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
