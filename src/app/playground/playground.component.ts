import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, OnInit, Output, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { ClaudeService } from '../core/services/claude.service';
import { FloatingChatComponent } from './components/floating-chat/floating-chat.component';
import { ProjectsService } from '../core/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../core/models/project.model';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-playground',
  imports: [CommonModule, FloatingChatComponent, ToastModule],
  templateUrl: './playground.component.html',
})
export class PlaygroundComponent implements OnInit {
  currentHtml = '';
  project?: Project;
  private platformId = inject(PLATFORM_ID);
  @ViewChild('floatingChat') floatingChat!: FloatingChatComponent;
  constructor(
    private claudeService: ClaudeService,
    private projectService: ProjectsService,
    private route: ActivatedRoute,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.getProject(id);
  }
  getProject(id: string) {
    this.projectService.getProject(id).subscribe({
      next: (res: any) => {
        this.project = res.data;
        if (res.data.html && res.data.html.length > 0) {
          this.currentHtml = res.data.html;
          this.applyHtml(this.currentHtml);
        }
      }
    })
  }
  sendPrompt(prompt: string) {

    const fullPrompt = this.currentHtml
      ? `HTML atual:\n${this.currentHtml}\n\nAlteração solicitada: ${prompt}`
      : prompt;
    try {
      this.claudeService.sendPrompt(fullPrompt).subscribe({
        next: (res) => {
          console.log('HTML recebido:', res);
          this.currentHtml = res;
          this.applyHtml(this.currentHtml);
        },
        error: (err) => { this.floatingChat.onResponse(false) },
        complete: () => { this.floatingChat.onResponse(true) }
      });
    } catch (err) {
    }
  }
  applyHtml(html: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    const iframe = document.getElementById('sandbox') as HTMLIFrameElement;
    if (!iframe) return;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const prev = iframe.src;
    iframe.src = url;
    iframe.onload = () => {
      if (prev.startsWith('blob:')) URL.revokeObjectURL(prev); // revoga a anterior
    };
  }
  saveHtml(clear?: boolean) {
    if (clear) {
      this.currentHtml = '';
      this.applyHtml('');  // limpa o iframe também
    }
    this.projectService.updateProject({ html: this.currentHtml }, this.project?.id).subscribe({
      next: (res) => {
        if (res.success) {
          this.showToast('success', 'Sucesso', 'Html salvo com sucesso.');
        } else {
          this.showToast('error', 'Erro', 'Erro ao salvar Html.');
        }
      },
      error: (err) => {
        const msg = err?.error?.message ?? 'Email ou senha inválidos.';
        this.showToast('error', 'Erro', msg);
      }
    })
  }
  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }
}
