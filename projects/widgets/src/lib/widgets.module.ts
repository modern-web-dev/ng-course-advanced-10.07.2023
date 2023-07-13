import { NgModule } from '@angular/core';
import {ErrorMsgPipe} from "./pipes/error-msg.pipe";
import { MyInputComponent } from './components/my-input/my-input.component';
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    ErrorMsgPipe,
    MyInputComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorMsgPipe,
    MyInputComponent
  ]
})
export class WidgetsModule { }
