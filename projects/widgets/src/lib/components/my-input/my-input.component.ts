import {Component, ElementRef, Input, Optional, Self, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";

@Component({
  selector: 'lib-my-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.css']
})
export class MyInputComponent implements ControlValueAccessor {

  @Input()
  label: string = '';

  @ViewChild("input", { static: true})
  private inputElementRef!: ElementRef<HTMLInputElement>;

  private onChangeCallback: (value: string) => void = () => {};
  private onTouchedCallback: (() => void) = () => {};

  constructor(@Optional() @Self() private formControl: NgControl | null) {
    if(this.formControl) {
      this.formControl.valueAccessor = this;
    }
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
