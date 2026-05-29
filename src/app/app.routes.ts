import { authGuard, guestGuard } from './auth.guard';
import { AuthComponent } from './auth/auth.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout.component';
import { PlaygroundComponent } from './playground/playground.component';
import { ConfigurationsComponent } from './dashboard/configurations/configurations.component';
import { ProjectsComponent } from './dashboard/projects/projects.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [guestGuard], // autenticado → vai pro dashboard
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [authGuard], // não autenticado → vai pro auth
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