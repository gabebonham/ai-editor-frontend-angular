import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CreateProjectComponent } from "./components/create-project/create-project.component";
import { ProjectsDisplayComponent } from "./components/project-display/projects-display.component";
import { ProjectsService } from '../../core/services/project.service';
import { Project } from '../../core/models/project.model';
@Component({
  selector: 'app-projects',
  imports: [
    MatIconModule,
    CommonModule,
    CreateProjectComponent,
    CreateProjectComponent,
    ProjectsDisplayComponent,
  ],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {
  constructor(private readonly projectsService: ProjectsService,private readonly cdr: ChangeDetectorRef) { }
  projects: Project[] = []
  ngOnInit(): void {
    this.loadProjects()
  }
  onProjectCreated(project: Project) {
      console.log('projeto criado:', project); // ← confirma o mdFileUrl aqui

    this.projects = [project, ...this.projects];
    this.cdr.detectChanges();
  }
  loadProjects() {
    this.projectsService.getProjects().subscribe({
      next: (res: any) => {
        this.projects = res.data.data
        this.cdr.detectChanges();
      }
    })
  }
}
