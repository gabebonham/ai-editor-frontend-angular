import { Component, Input, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../../shared/input/input.component';
@Component({
  selector: 'app-claude-md-card',
  imports: [ MatIconModule,CommonModule, InputComponent],
  templateUrl: './claude-md-card.component.html',
})
export class ClaudeMdCardComponent  {
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Aqui você pode adicionar a lógica para processar o arquivo selecionado
      console.log('Arquivo selecionado:', file);
    }
  }
}
