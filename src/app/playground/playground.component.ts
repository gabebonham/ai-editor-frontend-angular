import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, inject, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { ClaudeService } from '../core/services/claude.service';
import { FloatingChatComponent } from './components/floating-chat/floating-chat.component';
import { ProjectsService } from '../core/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../core/models/project.model';

@Component({
  selector: 'app-playground',
  imports: [CommonModule, FloatingChatComponent],
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
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.getProject(id);
  }
  getProject(id:string) {
    this.projectService.getProject(id).subscribe({next:(res:Project)=>{
      this.project = res;
      if (res.html && res.html.length > 0) {
        this.currentHtml = res.html;
        this.applyHtml(this.currentHtml);
      }
    }})
  }
  sendPrompt(prompt:string) {

    const fullPrompt = this.currentHtml 
      ? `HTML atual:\n${this.currentHtml}\n\nAlteração solicitada: ${prompt}`
      : prompt;
    try {
      this.claudeService.sendPrompt(fullPrompt).subscribe({
        next:(res)=>{
          this.currentHtml = res;
          this.applyHtml(this.currentHtml);
        },
        error: (err) => {this.floatingChat.onResponse(false)},
        complete: () => {this.floatingChat.onResponse(true)}
    });
    } catch (err) {
    } 
  }
  applyHtml(html: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const iframe = document.getElementById('sandbox') as HTMLIFrameElement;
    if (iframe) iframe.src = url;
  }

}
