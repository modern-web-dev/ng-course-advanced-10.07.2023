import {Pipe, PipeTransform} from '@angular/core';
import {ValidationErrors} from "@angular/forms";

@Pipe({
  name: 'errorMsg'
})
export class ErrorMsgPipe implements PipeTransform {

  transform(errors: ValidationErrors | null, fieldName?: string): string {
    console.log("errorMsg pipe called");
    if (errors) {
      const errorKeys = Object.keys(errors);
      return errorKeys
        .map(errorKey => this.errorToMessage(errorKey, errors[errorKey], fieldName))
        .join(', ');
    }
    return '';
  }

  private errorToMessage(errorKey: string, errorData: any, fieldName?: string): string {
    const _fieldName = fieldName ? fieldName : "this field";
    switch (errorKey) {
      case 'required':
        return `Value for ${_fieldName} is required.`;
      case 'minlength':
        return `Value for ${_fieldName} is ${errorData.actualLength} characters long, which is less than required ${errorData.requiredLength}`;
      case 'maxlength':
        return `Value for ${_fieldName} is ${errorData.actualLength} characters long, which is more than required ${errorData.requiredLength}`;
    }
    return '';
  }
}
