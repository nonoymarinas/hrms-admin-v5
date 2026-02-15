import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-manual-input-dark',
  standalone: true,
  imports: [],
  templateUrl: './manual-input-dark.html',
  styleUrl: './manual-input-dark.scss',
})
export class ManualInputDark {
  @Input() label: string = '';
  @Input() placeholder: string = '';
}
