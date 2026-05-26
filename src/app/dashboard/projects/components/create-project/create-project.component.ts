import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CreateProjectDialogComponent } from './create-project-dialog/create-project-dialog.component';
import { Project } from '../../../../core/models/project.model';
@Component({
  selector: 'app-create-project',
  imports: [MatIconModule, CommonModule, MatIconModule, CreateProjectDialogComponent],
  templateUrl: './create-project.component.html',
})
export class CreateProjectComponent {
  @Output() createdProject = new EventEmitter<Project>();
  onProjectCreated(project: Project) {
    this.createdProject.emit(project);
  }
}
