import { Component, Input, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-personal-info-card',
  imports: [ MatIconModule,CommonModule],
  templateUrl: './personal-info-card.component.html',
})
export class PersonalInfoCardComponent  {
    @Input() email?:string;
}
