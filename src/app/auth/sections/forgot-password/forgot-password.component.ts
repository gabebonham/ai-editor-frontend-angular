import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../shared/input/input.component';

type ForgotPasswordSections = 'email' | 'code' | 'newPassword';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterOutlet, InputComponent, CommonModule],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
    currentSection: ForgotPasswordSections = 'email';
    sections: ForgotPasswordSections[] = ['email', 'code', 'newPassword'];
    
    advanceSection() {
      if (this.currentSection === 'email') this.currentSection = 'code';
      else if (this.currentSection === 'code') this.currentSection = 'newPassword';
    }
    backSection() {
      if (this.currentSection === 'newPassword') this.currentSection = 'code';
      else if (this.currentSection === 'code') this.currentSection = 'email';
    }
}
