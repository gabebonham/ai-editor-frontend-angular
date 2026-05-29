import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';
import projectsJson from '../mocks/projects-mocks.json';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.dev';
@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    private readonly PATH = environment.apiUrl + '/projects'
    constructor(private http: HttpClient) { }

    getProjects(): Observable<any> {
        return this.http.get(this.PATH);
    }
    getProject(id: string): Observable<any> {
        return this.http.get(this.PATH + '/' + id);
    }
    deleteProject(id: string): Observable<any> {
        return this.http.delete(this.PATH + '/' + id);
    }
    createProject(project: Partial<Project>): Observable<any> {
        return this.http.post(this.PATH, project);
    }
    uploadMdFile(file: File, id?: string): Observable<any> {
        if (!id) return of({ success: false });

        const formData = new FormData();
        formData.append('file', file);

        return this.http.post(this.PATH + '/' + id + '/md-file', formData);
    }
    updateProject(project: Partial<Project>,id?:string): Observable<any> {
        if (!id) return of({ success: false });
        return this.http.patch(this.PATH+'/'+id, project);
    }
}