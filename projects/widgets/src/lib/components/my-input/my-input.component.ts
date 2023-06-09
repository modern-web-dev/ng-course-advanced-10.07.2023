import {Component, ElementRef, Optional, Self, ViewChild} from '@angular/core';
import {ControlValueAccessor, NgControl} from "@angular/forms";

@Component({
  selector: 'lib-my-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.css']
})
export class MyInputComponent implements ControlValueAccessor {

  @ViewChild("input", { static: true })
  inputElement: ElementRef<HTMLInputElement> | undefined;

  private onChangeCallback: (value: string) => void = () => {};

  private onTouchedCallback: () => void = () => {};

  constructor(@Optional() @Self() public formControl: NgControl | null) {
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
    if (this.inputElement) {
      this.inputElement.nativeElement.disabled = isDisabled;
    }
  }

  writeValue(value: string): void {
    if (this.inputElement) {
      this.inputElement.nativeElement.value = value;
    }
  }

  valueChanged(): void {
    if (this.inputElement) {
      const value = this.inputElement.nativeElement.value;
      this.onChangeCallback(value);
    }
  }

  onBlur() {
    this.onTouchedCallback();
  }
}
