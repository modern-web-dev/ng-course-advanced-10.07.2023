import { NgModule } from '@angular/core';
import {ErrorMsgPipe} from "./pipes/error-msg.pipe";
import { MyInputComponent } from './components/my-input/my-input.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ErrorMsgPipe,
    MyInputComponent
  ],
  imports: [
    FormsModule
  ],
  exports: [
    ErrorMsgPipe,
    MyInputComponent
  ]
})
export class WidgetsModule { }
