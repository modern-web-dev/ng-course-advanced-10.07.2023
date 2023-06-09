import {Component, ElementRef, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'lib-my-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MyInputComponent,
      multi: true
    }
  ]
})
export class MyInputComponent implements ControlValueAccessor {

  value = '';

  @ViewChild("input")
  inputElement!: ElementRef<HTMLInputElement>;

  private onChangeCallback: (value: string) => void = () => {};

  private onTouchedCallback: () => void = () => {};

  constructor() { }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(value: string): void {
    this.value = value;
  }

  valueChanged(): void {
    const value = this.inputElement.nativeElement.value;
    this.onChangeCallback(value);
    this.value = value;
  }
}
