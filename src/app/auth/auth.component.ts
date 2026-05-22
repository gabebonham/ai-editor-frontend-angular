import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from './components/input.component';
import { CommonModule } from '@angular/common';

type AuthSection = 'Login' | 'Register' | 'Forgot Password';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, InputComponent, CommonModule],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
    currentSection: AuthSection = 'Login';
    sections: AuthSection[] = ['Login', 'Register', 'Forgot Password'];
    switchSection(section: AuthSection) {
        this.currentSection = section;
    }
}
