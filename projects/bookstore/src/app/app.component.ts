import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild("editor")
  editor: ElementRef<HTMLInputElement> | undefined;
  // editor!: ElementRef<HTMLInputElement>

  // title: string | undefined = 'bookstore';
  title = 'bookstore';

  onBlur() {
    console.log('blur');
  }

  updateTitle() {
    if(this.editor) {
      this.title = this.editor.nativeElement.value;
    }
    // this.title = this.editor?.nativeElement.value;
  }
}
