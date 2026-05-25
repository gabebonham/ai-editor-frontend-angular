import { Component, Input, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { PersonalInfoCardComponent } from './components/personal-info-card/personal-info-card.component';
import { AnthropicApiKeyCardComponent } from './components/anthropic-api-key-card/anthropic-api-key-card.component';
import { ClaudeMdCardComponent } from './components/claude-md-card/claude-md-card.component';
@Component({
  selector: 'app-configurations',
  imports: [ MatIconModule,CommonModule, PersonalInfoCardComponent, AnthropicApiKeyCardComponent, ClaudeMdCardComponent],
  templateUrl: './configurations.component.html',
})
export class ConfigurationsComponent  {

}
