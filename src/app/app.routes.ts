import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ConfigurationsComponent } from './dashboard/configurations/configurations.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout.component';
import { ProjectsComponent } from './dashboard/projects/projects.component';
import { PlaygroundComponent } from './playground/playground.component';

export const routes: Routes = [
    
    {
        path: 'auth',
        component: AuthComponent,
    },

    {
        path: 'dashboard',
        component: DashboardLayoutComponent,
        children: [
            { path: 'settings', component: ConfigurationsComponent },
            { path: 'projects', component: ProjectsComponent },
            { path: '', redirectTo: 'projects', pathMatch: 'full' }
        ]
    },
    {
        path: 'playground/:id',
        component: PlaygroundComponent,
    },
];
