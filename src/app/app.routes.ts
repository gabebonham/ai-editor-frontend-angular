import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ConfigurationsComponent } from './dashboard/configurations/configurations.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout.component';

export const routes: Routes = [
    
    {
        path: 'auth',
        component: AuthComponent,
    },

    {
        path: 'dashboard',
        component: DashboardLayoutComponent,
        children: [
            { path: 'configurations', component: ConfigurationsComponent },
            { path: '', redirectTo: 'configurations', pathMatch: 'full' }
        ]
    },
];
