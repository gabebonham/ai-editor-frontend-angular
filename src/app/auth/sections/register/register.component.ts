import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../shared/input/input.component';
import { ToastModule } from 'primeng/toast';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  imports: [InputComponent, CommonModule, ToastModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form: FormGroup;
  loading = false;
  serverError = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validators: this.passwordMatchValidator });
  }
  passwordMatchValidator(form: AbstractControl) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }
  get email() { return this.form.get('email')!; }
  get username() { return this.form.get('username')!; }
  get password() { return this.form.get('password')!; }
  get confirmPassword() { return this.form.get('confirmPassword')!; }

  onSubmit() {
    if (this.form.invalid) {
      this.showToast('error', 'Erro', 'Preencha os dados adequadamente.');
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.authService.register(
      this.form.value.email,
      this.form.value.password,
      this.form.value.confirmPassword,
      this.form.value.username
    ).subscribe({
      next: (res) => {
        if (res.success) {
          this.showToast('info', 'Sucesso', 'Cadastro realizado com sucesso.');
          setTimeout(() => this.router.navigate(['/auth']), 1500); // aguarda o toast
        } else {
          this.showToast('error', 'Erro', res.message);
          this.loading = false;
        }
      },
      error: (err) => {
        this.showToast('error', 'Erro', err);
        this.loading = false;
      }
    });
  }
  showToast(severity:string, summary:string,detail:string) {
    this.messageService.add({ severity, summary, detail });
  }
}
