import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-button-type-02',
  standalone: true,
  templateUrl: './button-type-02.html',
  styleUrls: ['./button-type-02.scss'],
})
export class ButtonType02 {
  /** Button text */
  @Input() label: string = 'Button';

  /** Controls active / disabled UI state */
  @Input() isActive: boolean = true;

  /** Click event emitted to parent */
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    if (!this.isActive) return;
    this.clicked.emit();
  }
}
