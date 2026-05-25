import { Component, forwardRef, Input, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'app-input',
  imports: [ MatIconModule,CommonModule],
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
})
export class InputComponent implements ControlValueAccessor {
    // callbacks registrados pelo Angular
    private onChange = (v: any) => {};
    onTouched = () => {};
    onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value); // ← notifica o FormGroup
    }
    ngOnInit() {
        this.inputType = this.type;
    }

    // Angular chama isso pra setar o valor no componente
    writeValue(value: string): void {
        this.value = value ?? '';
    }

    // Angular chama isso pra saber quando o valor muda
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    // Angular chama isso pra saber quando o campo foi tocado
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    // Angular chama isso pra desabilitar
    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }
    value = '';
    isDisabled = false;
    inputType = 'text';
    visible = false;
    @Input() hasError = false;
    @Input() type: string = 'text';
    @Input() canToggleVisible: boolean = false;
    @Input() placeholder?: string;
    @Input() icon?: string;

    toggleVisible() {
        if (this.canToggleVisible) {
            this.visible = !this.visible;
        }
    }
    getType() {
        if (this.canToggleVisible) {
            return this.visible ? this.type : 'password';
        }
        return this.type;
    }
}
