import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-floating-chat',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <!-- Floating Button -->
<button
  (click)="toggleChat()"
  class="cursor-pointer fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300"
  [class.rotate-45]="isOpen"
  style="background: #76B6C4">
  <svg *ngIf="!isOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
  <svg *ngIf="isOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>

<!-- Chat Panel -->
<div
  *ngIf="isOpen"
  class="fixed bottom-24 right-6 z-50 w-80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
  style="height: 420px; background: #3A3C3C; border: 1px solid rgba(118,182,196,0.3)">

  <!-- Header -->
  <div class="px-4 py-3 flex items-center gap-3"
    style="background: rgba(118,182,196,0.12); border-bottom: 1px solid rgba(118,182,196,0.2)">
    <div class="w-2 h-2 rounded-full animate-pulse" style="background: #97CA9C"></div>
    <button [disabled]="loading" class="cursor-pointer text-xs text-white bg-primary w-32 h-8 rounded-lg" (click)="onClearHtml()">Limpar Html</button>
    <button [disabled]="loading" class="cursor-pointer text-xs text-white bg-primary w-32 h-8 rounded-lg" (click)="onSaveHtml()">Salvar Html</button>
  </div>

  <!-- Messages -->
  <div class="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm">
    <div *ngFor="let msg of messages"
      [class]="msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'">
      <div
        [class]="msg.role === 'user'
          ? 'max-w-[80%] px-3 py-2 rounded-2xl rounded-br-sm text-xs'
          : 'max-w-[80%] px-3 py-2 rounded-2xl rounded-bl-sm text-xs'"
        [style]="msg.role === 'user'
          ? 'background: #76B6C4; color: #EEF6F6'
          : 'background: rgba(238,246,246,0.07); color: #c8dfe2'">
        {{ msg.content }}
      </div>
    </div>

    <div *ngIf="loading" class="flex justify-start">
      <div class="px-3 py-2 rounded-2xl rounded-bl-sm text-xs"
        style="background: rgba(238,246,246,0.07); color: rgba(238,246,246,0.5)">
        <span class="animate-pulse">Gerando...</span>
      </div>
    </div>
  </div>

  <!-- Input -->
  <div class="px-3 py-3" style="border-top: 1px solid rgba(118,182,196,0.2)">
    <div [formGroup]="form" class="flex gap-2 items-end">
      <textarea
        formControlName="promptInput"
        (keydown.enter)="onEnter($event)"
        rows="2"
        placeholder="Descreva uma alteração..."
        class="flex-1 resize-none rounded-xl px-3 py-2 text-xs outline-none"
        style="background: rgba(238,246,246,0.07); border: 1px solid rgba(118,182,196,0.3); color: #EEF6F6;">
      </textarea>
      <button
        (click)="submit()"
        [disabled]="loading || form.invalid"
        class="cursor-pointer w-9 h-9 rounded-xl flex items-center justify-center transition-opacity disabled:opacity-40 shrink-0"
        style="background: #76B6C4">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#EEF6F6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </button>
    </div>
  </div>
</div>
  `
})
export class FloatingChatComponent {
  @Output() promptSubmit = new EventEmitter<string>();

  isOpen = false;
  loading = false;
  messages: { role: 'user' | 'assistant'; content: string }[] = [
    { role: 'assistant', content: 'Olá! Descreva o que quer alterar na interface.' }
  ];

  form: FormGroup;
  @Output() updatedProject = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      promptInput: ['', Validators.required]
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  onEnter(event: Event) {
    const ke = event as KeyboardEvent;
    if (!ke.shiftKey) {
      ke.preventDefault();
      this.submit();
    }
  }

  submit() {
    if (this.form.invalid || this.loading) return;
    const prompt = this.form.get('promptInput')?.value?.trim();
    if (!prompt) return;

    this.messages.push({ role: 'user', content: prompt });
    this.form.reset();
    this.loading = true;
    this.promptSubmit.emit(prompt);
  }

  onResponse(success: boolean) {
    this.loading = false;
    this.messages.push({
      role: 'assistant',
      content: success ? 'Interface atualizada! ✨' : 'Erro ao atualizar. Tente novamente.'
    });
    this.cdr.detectChanges();
  }
  onSaveHtml() {
    this.updatedProject.emit(false);
  }
  onClearHtml() {
    this.updatedProject.emit(true);
  }
}