import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'ui-icon-screen-settings',
  imports: [],
  templateUrl: './icon-screen-settings.html',
  styleUrl: './icon-screen-settings.scss',
})
export class IconScreenSettings {
  constructor(private router: Router) {}
  onClickSettings() {
    this.router.navigate(['/setting-main']);
  }
}
