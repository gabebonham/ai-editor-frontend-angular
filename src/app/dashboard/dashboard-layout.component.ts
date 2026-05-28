import { Component, inject, Input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DashboardHeaderComponent } from './components/header/dashboard-header.component';
@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, MatIconModule,CommonModule, DashboardHeaderComponent],
  templateUrl: './dashboard-layout.component.html',
    standalone: true,
})
export class DashboardLayoutComponent implements OnInit {
    private platformId = inject(PLATFORM_ID);
    constructor(private router:Router){}
    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)&&!localStorage.getItem('token')) {
            this.router.navigate(['/auth']);
        }
    }
}
