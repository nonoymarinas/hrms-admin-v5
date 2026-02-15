import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'ui-icon-screen-person',
  imports: [],
  templateUrl: './icon-screen-person.html',
  styleUrl: './icon-screen-person.scss',
})
export class IconScreenPerson {
  constructor(private router: Router) {}
  onClickHome() {
    this.router.navigate(['/person-main']);
  }
}
