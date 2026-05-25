import { Component, signal } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
@Component({
    selector: 'app-dashboard-sidebar',
    imports: [DrawerModule, ButtonModule],
    templateUrl: './dashboard-sidebar.component.html',
    standalone: true,
})
export class DashboardSidebarComponent {
  isDrawerVisible = false;

  onDrawerHide() {
    this.isDrawerVisible = false; // Reset when drawer is closed by mask click or Esc key
  }
}
