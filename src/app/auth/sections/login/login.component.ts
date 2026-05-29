import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { InputComponent } from '../../../shared/input/input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [InputComponent, CommonModule, ReactiveFormsModule, ToastModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  serverError = '';
  private platformId = inject(PLATFORM_ID);
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
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
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.serverError = '';

    this.authService.login(this.form.value.email, this.form.value.password).subscribe({
      next: (res) => {
        console.log('next', res);
        if (res.success && isPlatformBrowser(this.platformId)) {
          const user = {
            hasAnthropicKey: res.data.user.hasAnthropicKey,
            email:res.data.user.email,
            username:res.data.user.username,
          }
          localStorage.setItem('user', JSON.stringify(user));
          this.authService.setAuthenticated(true);
          this.router.navigate(['/dashboard/projects']);
        } else {
          this.showToast('error', 'Erro', res.message);
        }
        this.loading = false;
      },
      error: (err) => {
        const msg = err?.error?.message ?? 'Email ou senha inválidos.';
        this.showToast('error', 'Erro', msg);
        this.loading = false;
      }
    });
  }
  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }
}
