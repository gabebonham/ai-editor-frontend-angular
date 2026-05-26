import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { Project } from '../../../../core/models/project.model';
@Component({
  selector: 'app-projects-display',
  imports: [ MatIconModule,CommonModule, ProjectCardComponent],
  templateUrl: './projects-display.component.html',
})
export class ProjectsDisplayComponent  {
  @Input() projects:Project[] = []
}
