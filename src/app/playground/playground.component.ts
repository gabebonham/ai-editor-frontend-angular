import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ClaudeService } from '../core/services/claude.service';
import { FloatingChatComponent } from './components/floating-chat/floating-chat.component';

@Component({
  selector: 'app-playground',
  imports: [CommonModule, FloatingChatComponent],
  templateUrl: './playground.component.html',
})
export class PlaygroundComponent {
  currentHtml = '';
  @ViewChild('floatingChat') floatingChat!: FloatingChatComponent;
  constructor(
    private claudeService: ClaudeService,
  ) {}

  sendPrompt(prompt:string) {

    const fullPrompt = this.currentHtml 
      ? `HTML atual:\n${this.currentHtml}\n\nAlteração solicitada: ${prompt}`
      : prompt;
    try {
      this.claudeService.sendPrompt(fullPrompt).subscribe({
        next:(res)=>{
          console.log('next chamado', res.length);
          this.currentHtml = res;
          this.applyHtml(this.currentHtml);
        },
        error: (err) => {console.log('error chamado', err);this.floatingChat.onResponse(false)},
        complete: () => {console.log('complete chamado');this.floatingChat.onResponse(true)}
    });
    } catch (err) {
      console.log('Erro ao enviar prompt.');
    } 
  }
  applyHtml(html: string) {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const iframe = document.getElementById('sandbox') as HTMLIFrameElement;
    if (iframe) iframe.src = url;
  }

}
