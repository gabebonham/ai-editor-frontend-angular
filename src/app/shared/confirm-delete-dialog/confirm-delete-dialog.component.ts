import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-confirm-delete-dialog',
  imports: [MatIconModule, CommonModule, MatIconModule, DialogModule],
  templateUrl: './confirm-delete-dialog.component.html',
})
export class ConfirmDeleteDialogueComponent  {
    @Input() projectId?:string
    @Input() btnIcon?:string
    @Input() btnLabel?:string
    @Input() title?:string
    @Input() btnTextColor?:string
    @Input() btnColor?:string
    @Input() description?:string
    @Output() onDelete = new EventEmitter<void>();
    isModalVisible = false;
    confirm() {
        this.onDelete.emit();
        this.isModalVisible = false;
    }

}
