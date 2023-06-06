import { Pipe, PipeTransform } from '@angular/core';
import {ValidationErrors} from "@angular/forms";

@Pipe({
  name: 'errorMsg',
  pure: true
})
export class ErrorMsgPipe implements PipeTransform {

  transform(errors: ValidationErrors | null, fieldName: string): string {
    console.log("ErrorMsgPipe is called!");
    if (errors) {
      const errorKeys = Object.keys(errors);
      return errorKeys.map(errorKey => this.errorToMessage(fieldName, errorKey, errors[errorKey])).join(', ');
    } else {
      return '';
    }
  }

  private errorToMessage(fieldName: string, errorKey: string, errorData: any): string {
    switch(errorKey) {
      case 'required':
        return `Value for ${fieldName} is required`;
      case 'minlength':
        return `Value for ${fieldName} is ${errorData.actualLength} characters long, which is less than required ${errorData.requiredLength}`;
      case 'maxlength':
        return `Value for ${fieldName} is ${errorData.actualLength} characters long, which is more than required ${errorData.requiredLength}`;
    }
    return '';
  }

}
