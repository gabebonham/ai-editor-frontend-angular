import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../shared/input/input.component';


@Component({
  selector: 'app-register',
  imports: [RouterOutlet, InputComponent, CommonModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
}
