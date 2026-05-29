import { Component, Input, OnInit, signal } from '@angular/core';
import { DashboardSidebarComponent } from '../sidebar/dashboard-sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
    selector: 'app-dashboard-header',
    imports: [DashboardSidebarComponent, MatIconModule],
    templateUrl: './dashboard-header.component.html',
    standalone: true,
})
export class DashboardHeaderComponent implements OnInit {
    title?: string;
    isMobile: boolean = false;
    constructor(
        private router: Router,
        private breakpointObserver: BreakpointObserver
    ) {
        this.breakpointObserver.observe(Breakpoints.Handset).subscribe(result => {
            this.isMobile = result.matches;
        });
    }
    @Input() username: string = '';
    ngOnInit(): void {
        // seta o título na inicialização
        this.title = this.getHeaderTitle(this.router.url);

        // reage a mudanças de rota
        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((e: any) => {
                this.title = this.getHeaderTitle(e.urlAfterRedirects);
            });
    }

    getHeaderTitle(url: string) {
        if (url.includes('settings')) return 'Configurações';
        if (url.includes('projects')) return 'Projetos'; // faltava isso
        return '';
    }
    getUrl() {
        const url = this.router.url
        return url;
    }
}
