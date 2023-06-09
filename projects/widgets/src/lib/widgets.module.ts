import { NgModule } from '@angular/core';
import {ErrorMsgPipe} from "./pipes/error-msg.pipe";
import { MyInputComponent } from './components/my-input/my-input.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    ErrorMsgPipe,
    MyInputComponent
  ],
  imports: [
    FormsModule, CommonModule
  ],
  exports: [
    ErrorMsgPipe,
    MyInputComponent
  ]
})
export class WidgetsModule { }
