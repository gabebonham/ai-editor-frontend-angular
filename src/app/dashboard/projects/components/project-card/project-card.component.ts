import { Component, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Project } from '../../../../core/models/project.model';
import { ConfirmDeleteDialogueComponent } from '../../../../shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { ProjectsService } from '../../../../core/services/project.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-project-card',
  imports: [MatIconModule, CommonModule, MatIconModule, ConfirmDeleteDialogueComponent,ToastModule],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent implements OnInit, OnChanges {

  constructor(
    private readonly messageService: MessageService,
    private readonly projectsService: ProjectsService
  ) { }
  mdFileUrl = signal<string | undefined | null>(undefined);
  @Input() project?: Project
  get projectName(): string {
    const name = this.project?.name ?? '';
    return name.length > 18 ? name.slice(0, 18) + '...' : name;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project']) {
      this.mdFileUrl.set(this.project?.mdFileUrl || null);
    }
  }

  toggleMdFile(mdFileUrl: string) {
    this.mdFileUrl.set(mdFileUrl);
  }
  ngOnInit(): void {
    this.mdFileUrl.set(this.project?.mdFileUrl ?? undefined);
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.projectsService.uploadMdFile(file, this.project?.id).subscribe({
        next: (res) => {
          if (res.success) {
            this.toggleMdFile(res.data.mdFileUrl);
            this.showToast('success', 'Sucesso', 'Arquivo upado com sucesso.');
          } else {
            this.showToast('error', 'Erro', 'Arquivo não upado.');
          }
        },
        error: (err) => {
          const msg = err?.error?.message ?? 'Email ou senha inválidos.';
          this.showToast('error', 'Erro', msg);
        }
      })
    }
  }
  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }
  deleteProject(id?: string) {
    if (!id) return;
    this.projectsService.deleteProject(id).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.showToast('info', 'Sucesso', 'Projeto deletado com sucesso.')
        } else {
          const msg = res?.message ?? 'Email ou senha inválidos.';
          this.showToast('error', 'Erro', msg);
        }
      },
      error: (err) => {
        const msg = err?.error?.message ?? 'Email ou senha inválidos.';
        this.showToast('error', 'Erro', msg);
      }
    })
  }
}
