import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
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
    isModalVisible: boolean = false;
    form: FormGroup;
    loading = false;
    serverError = '';
    title = 'Criar Projeto';
    constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private projectService: ProjectsService) {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            description: ['', ],
        });
    }
    get name() { return this.form.get('name')!; }
    get description() { return this.form.get('description')!; }
    @Output() createdProject = new EventEmitter<Project>();
    onSubmit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.loading = true;
        const projectDto = {
            name: this.form.value.name,
            description: this.form.value.description,
        };
        this.projectService.createProject(projectDto).subscribe({
            next: (res: any) => {
                this.isModalVisible = false;      // <- fecha o dialog primeiro
                this.cdr.detectChanges();         // <- força o Angular a processar o fechamento
                this.createdProject.emit(res.data); // <- só então emite pro pai
                this.loading = false;
                this.form.reset();
            },
            error: () => {
                this.serverError = 'Dados inválidos.';
                this.loading = false;
            }
        });
    }
}
