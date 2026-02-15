import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'ui-icon-screen-records',
  imports: [],
  templateUrl: './icon-screen-records.html',
  styleUrl: './icon-screen-records.scss',
})
export class IconScreenRecords {
  constructor(private router: Router) {}
  onClickRecords() {
    this.router.navigate(['/record-main']);
  }
}
