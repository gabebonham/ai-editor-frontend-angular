import { Component, Input, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-input',
  imports: [RouterOutlet, MatIconModule,CommonModule],
  templateUrl: './input.component.html',
})
export class InputComponent {
    visible = false;
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
