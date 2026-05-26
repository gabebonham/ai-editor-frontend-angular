import { Component, OnInit, signal } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
@Component({
    selector: 'app-dashboard-sidebar',
    imports: [DrawerModule, ButtonModule, MatIconModule, RouterModule],
    templateUrl: './dashboard-sidebar.component.html',
    standalone: true,
})
export class DashboardSidebarComponent implements OnInit {
    readonly avatarColor: string;
    ngOnInit(): void {
        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((e: any) => {
                this.currentUrl = e.urlAfterRedirects;
            });
    }
    constructor(private router: Router) {
        this.avatarColor = this.getBgColor();
        this.currentUrl = this.router.url; 
    }
    currentUrl = '';

    email?: string = 'grotegabriel@gmail.com'
    isDrawerVisible = false;
    menuItems = [
        {
            title: 'Configurações',
            path: '/dashboard/settings',
            icon: 'settings',
            selected: false
        },
        {
            title: 'Projetos',
            path: '/dashboard/projects',
            icon: 'grid_view',
            selected: false
        },
    ]
    getUrl() {
        const url = this.router.url
        return url;
    }
    getHeaderTitle(url: string) {
        if (url.includes('settings')) return 'Configurações'
        else if (url.includes('projects')) return 'Projetos'
        else return '';
    }
    getMenuItems() {
        return this.menuItems.map(i => ({
            ...i,
            selected: this.currentUrl.includes(i.path)
        }));
    }
    onDrawerHide() {
        this.isDrawerVisible = false;
    }
    getInitials() {
        if (!this.email) return ''
        return this.email.slice(0, 2).toUpperCase();
    }
    getColor() {
        const colors = ['red', 'orange', 'yellow', 'purple', 'blue', 'green']
        return colors[Math.floor(Math.random() * colors.length)]
    }
    getBgColor() {
        const colors: any = {
            red: '#ef4444', orange: '#f97316', yellow: '#eab308',
            purple: '#a855f7', blue: '#3b82f6', green: '#22c55e'
        }
        return colors[this.getColor()];
    }

}
