import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../shared/input/input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  imports: [RouterOutlet, InputComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  serverError = '';
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get email() { return this.form.get('email')!; }
  get password() { return this.form.get('password')!; }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // mostra todos os erros
      return;
    }

    this.loading = true;
    this.serverError = '';

    try {
      await this.authService.login(this.form.value.email, this.form.value.password);
      this.router.navigate(['/dashboard']);
    } catch (err) {
      this.serverError = 'Email ou senha inválidos.';
    } finally {
      this.loading = false;
    }
  }
}
