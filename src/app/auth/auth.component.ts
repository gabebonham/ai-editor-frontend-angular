import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LoginComponent } from './sections/login/login.component';
import { ForgotPasswordComponent } from './sections/forgot-password/forgot-password.component';
import { RegisterComponent } from './sections/register/register.component';
import { AuthService } from '../core/services/auth.service';

type AuthSection = 'Login' | 'Cadastro' | 'Esqueci minha senha';

@Component({
  selector: 'app-auth',
  imports: [ CommonModule, LoginComponent, RegisterComponent, ForgotPasswordComponent],
  templateUrl: './auth.component.html',
})
export class AuthComponent  {
    constructor(){}

    currentSection: AuthSection = 'Login';
    sections: AuthSection[] = ['Login', 'Cadastro', 'Esqueci minha senha'];
    switchSection(section: AuthSection) {
        this.currentSection = section;
    }

}
