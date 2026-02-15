import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'ui-icon-screen-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './icon-screen-dashboard.html',
  styleUrls: ['./icon-screen-dashboard.scss'],
})
export class IconScreenDashboard {
  constructor(private router: Router) {}
  onClickDashboard() {
    this.router.navigate(['/dashboard-main']);
  }
}
