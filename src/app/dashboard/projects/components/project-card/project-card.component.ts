import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Project } from '../../../../core/models/project.model';
import { Router, RouterLink } from "@angular/router";
import { ConfirmDeleteDialogueComponent } from '../../../../shared/confirm-delete-dialog/confirm-delete-dialog.component';
@Component({
  selector: 'app-project-card',
  imports: [MatIconModule, CommonModule, MatIconModule, RouterLink, ConfirmDeleteDialogueComponent],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  constructor(private readonly router: Router) { }
  @Input() project?: Project
  deleteProject(id?: string) {
    console.log(id)
  }
}
