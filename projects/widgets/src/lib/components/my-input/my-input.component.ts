import {Component, ElementRef, Input, ViewChild} from '@angular/core';
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

  @Input()
  label: string = '';

  @ViewChild("input", { static: true})
  private inputElementRef!: ElementRef<HTMLInputElement>;

  private onChangeCallback: (value: string) => void = () => {};
  private onTouchedCallback: (() => void) = () => {};

  constructor() {
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.inputElementRef.nativeElement.disabled = isDisabled;
  }

  writeValue(value: string): void {
    this.inputElementRef.nativeElement.value = value;
  }

  valueChanged(): void {
    const value = this.inputElementRef.nativeElement.value;
    this.onChangeCallback(value);
  }

  blurred(): void {
    this.onTouchedCallback();
  }
}
