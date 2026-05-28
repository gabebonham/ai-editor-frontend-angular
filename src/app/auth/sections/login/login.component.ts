import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../shared/input/input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [InputComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  serverError = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
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
      this.authService.login(this.form.value.email, this.form.value.password).subscribe({
        next: (res) => {
        if (res.success) {
          localStorage.setItem('token', res.data.access_token);
          this.router.navigate(['/dashboard/projects']);
        }
      },});
      this.router.navigate(['/dashboard']);
    } catch (err) {
      this.serverError = 'Email ou senha inválidos.';
    } finally {
      this.loading = false;
    }
  }
}
