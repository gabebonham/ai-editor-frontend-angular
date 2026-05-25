import { Component, signal } from '@angular/core';
import { DashboardSidebarComponent } from '../sidebar/dashboard-sidebar.component';
@Component({
    selector: 'app-dashboard-header',
    imports: [DashboardSidebarComponent],
    templateUrl: './dashboard-header.component.html',
    standalone: true,
})
export class DashboardHeaderComponent {

}
