import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router } from '@angular/router';
import { count, forkJoin } from 'rxjs';
import { ReferenceAddressesService } from '../../../shared/services/references/addressess/addresses.service';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class Sidebar {
  constructor(
    private router: Router,
    private ref: ReferenceAddressesService,
  ) {}

  isCollapsed = true;

  onToggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  onAdminMenuClick(): void {
    this.router.navigate(['/admin-main']);
    this.onToggleSidebar();
  }
  onHomeMenuClick(): void {
    this.router.navigate(['/home-main']);
    this.onToggleSidebar();
  }
  onDashboardsMenuClick(): void {
    this.router.navigate(['/dashboard-main']);
    this.onToggleSidebar();
  }

  onPersonMenuClick(): void {
    this.router.navigate(['/person-main']);
    this.onToggleSidebar();
  }

  onRecordsMenuClick(): void {
    this.router.navigate(['/record-main']);
    this.onToggleSidebar();
  }
  onSettingsMenuClick(): void {
    this.router.navigate(['/setting-main']);
    this.onToggleSidebar();
  }
}
