import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'ui-view-item',
  imports: [],
  templateUrl: './view-item.html',
  styleUrl: './view-item.scss',
})
export class ViewItem {
  @Input() label: string = '';
  @Input() value: string = '';
}
