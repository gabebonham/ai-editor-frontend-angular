import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';
import projectsJson from '../mocks/projects-mocks.json';
import { Observable, of } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ProjectsService {

    constructor(private http: HttpClient) {}

    getProjects(): Observable<Project[]> {
        const projects = (projectsJson as any[]).map(p => ({
            ...p,
            createdAt: (new Date(p.createdAt)).toLocaleDateString('pt-BR')
        }));
        return of(projects);
    }
    getProject(id:string): Observable<Project> {
        const projects = (projectsJson as any[]).map(p => ({
            ...p,
            createdAt: (new Date(p.createdAt)).toLocaleDateString('pt-BR')
        }));
        const project = projects.find(proj=>proj.id==id);
        return of(project);
    }
    createProject(project: Partial<Project>): Observable<Project> {
        return of({
            html:'',
            name: project.name!,
            owner: project.owner!,
            repoLink: project.repoLink!,
            id: crypto.randomUUID(),
            createdAt: new Date().toLocaleDateString('pt-BR'),
            widgetInjected: false
        });
    }
}