import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'ui-icon-screen-profile',
  imports: [],
  templateUrl: './icon-screen-profile.html',
  styleUrl: './icon-screen-profile.scss',
})
export class IconScreenProfile {
  constructor(private router: Router) {}
  onClickProfile() {
    this.router.navigate(['/profile-main']);
  }
}
