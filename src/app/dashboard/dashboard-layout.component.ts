import { Component, Input, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from './components/header/dashboard-header.component';
@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, MatIconModule,CommonModule, DashboardHeaderComponent],
  templateUrl: './dashboard-layout.component.html',
    standalone: true,
})
export class DashboardLayoutComponent  {

}
