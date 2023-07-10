import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bookstore';

  @ViewChild("editor")
  editor!: ElementRef<HTMLInputElement>;
  // editor: ElementRef<HTMLInputElement> | undefined;

  reset(): void {
    this.title = 'bookstore'
  }

  updateValue(): void {
    this.title = this.editor.nativeElement.value;
    // if(this.editor != null) {
    //   this.title = this.editor.nativeElement.value;
    // }
  }
}
