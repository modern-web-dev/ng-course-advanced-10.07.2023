import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild("editor")
  editor!: ElementRef<HTMLInputElement>;

  title = 'bookstore';

  updateTitle() {
    this.title = this.editor.nativeElement.value;
  }
}
