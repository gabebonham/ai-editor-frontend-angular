import { Component, inject, Input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DashboardHeaderComponent } from './components/header/dashboard-header.component';
import { AuthService } from '../core/services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DashboardSideMenuComponent } from './components/sidemenu/dashboard-sidemenu.component';
@Component({
    selector: 'app-dashboard-layout',
    imports: [RouterOutlet, MatIconModule, CommonModule, DashboardHeaderComponent, DashboardSideMenuComponent],
    templateUrl: './dashboard-layout.component.html',
    standalone: true,
})
export class DashboardLayoutComponent {
    isMobile = false;
    constructor(
        private authService: AuthService,
        private breakpointObserver: BreakpointObserver
    ) {
        this.breakpointObserver.observe(Breakpoints.Handset).subscribe(result => {
            this.isMobile = result.matches;
        });
    }

    loadUsername(): string {
        return this.authService.getUsername() ?? ''
    }
}
