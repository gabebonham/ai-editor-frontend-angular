import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectsService } from '../../../../../core/services/project.service';
import { Router } from '@angular/router';
import { InputComponent } from '../../../../../shared/input/input.component';
import { Project } from '../../../../../core/models/project.model';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'app-create-project-dialog',
    imports: [MatIconModule, CommonModule, MatIconModule, ReactiveFormsModule, InputComponent, DialogModule],
    templateUrl: './create-project-dialog.component.html',
})
export class CreateProjectDialogComponent {
    isModalVisible:boolean = false;
    form: FormGroup;
    loading = false;
    serverError = '';
    title = 'Criar Projeto';
    constructor(private fb: FormBuilder, private router: Router, private projectService: ProjectsService) {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            owner: ['', [Validators.required]],
            repoLink: ['', [Validators.required]]
        });
    }
    get name() { return this.form.get('name')!; }
    get repoLink() { return this.form.get('repoLink')!; }
    get owner() { return this.form.get('owner')!; }
    @Output() createdProject = new EventEmitter<Project>();
    onSubmit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.loading = true;
        this.serverError = '';
        const projectDto = {
            name: this.form.value.name,
            repoLink: this.form.value.repoLink,
            owner: this.form.value.owner,
        };
        this.projectService.createProject(projectDto).subscribe({
            next: (res: Project) => {
                this.createdProject.emit(res);
                this.loading = false;
                this.isModalVisible = false;
            },
            error: () => {
                this.serverError = 'Dados inválidos.';
                this.loading = false;
            }
        });
    }
}
