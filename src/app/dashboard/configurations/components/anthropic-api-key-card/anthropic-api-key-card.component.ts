import { Component, Input, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../../shared/input/input.component';
@Component({
  selector: 'app-anthropic-api-key-card',
  imports: [ MatIconModule,CommonModule, InputComponent],
  templateUrl: './anthropic-api-key-card.component.html',
})
export class AnthropicApiKeyCardComponent  {
}
