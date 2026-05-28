import { Component, Input, OnInit } from '@angular/core';
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
export class ProjectCardComponent implements OnInit {
  constructor(private readonly router: Router) { }
  isInjected:boolean = false;
  @Input() project?: Project
  get projectName(): string {
    const name = this.project?.name ?? '';
    return name.length > 9 ? name.slice(0, 11) + '...' : name;
  }
  deleteProject(id?: string) {
    console.log(id)
  }
  toggleWidgetInjected(){
    this.isInjected = !this.isInjected;
  }
  ngOnInit(): void {
    this.isInjected = this.project?.widgetInjected ?? false;
  }
}
