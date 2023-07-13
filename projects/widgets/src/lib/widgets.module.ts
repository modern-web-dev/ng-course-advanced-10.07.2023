import { NgModule } from '@angular/core';
import {ErrorMsgPipe} from "./pipes/error-msg.pipe";



@NgModule({
  declarations: [
    ErrorMsgPipe
  ],
  imports: [
  ],
  exports: [
    ErrorMsgPipe
  ]
})
export class WidgetsModule { }
