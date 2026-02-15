import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'ui-icon-screen-admin',
  imports: [],
  templateUrl: './icon-screen-admin.html',
  styleUrl: './icon-screen-admin.scss',
})
export class IconScreenAdmin {
  constructor(private router: Router) {}
  onClickAdmin() {
    this.router.navigate(['/admin-main']);
  }
}
