import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../shared/input/input.component';
import { LoginComponent } from './sections/login/login.component';
import { ForgotPasswordComponent } from './sections/forgot-password/forgot-password.component';
import { RegisterComponent } from './sections/register/register.component';

type AuthSection = 'Login' | 'Cadastro' | 'Esqueci minha senha';

@Component({
  selector: 'app-auth',
  imports: [ InputComponent, CommonModule, LoginComponent, RegisterComponent, ForgotPasswordComponent],
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
    constructor(private router:Router){}
    ngOnInit(): void {
        if (localStorage.getItem('token')) {
            this.router.navigate(['/dashboard/projects']);
        }
    }
    currentSection: AuthSection = 'Login';
    sections: AuthSection[] = ['Login', 'Cadastro', 'Esqueci minha senha'];
    switchSection(section: AuthSection) {
        this.currentSection = section;
    }

}
