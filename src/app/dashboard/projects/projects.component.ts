import { Component, OnInit } from '@angular/core';
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
  constructor(private readonly projectsService:ProjectsService){}
  projects:Project[] = []
  ngOnInit(): void {
    this.loadProjects()
  }
  onProjectCreated(project: Project) {
    this.projects = [project, ...this.projects];
  }
  loadProjects(){
    this.projectsService.getProjects().subscribe({next:(res:Project[])=>{
      this.projects = res
    }})
  }
}
