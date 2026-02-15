import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ui-manual-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manual-input.html',
  styleUrls: ['./manual-input.scss'],
})
export class ManualInput implements OnChanges {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() value = '';            // ✅ this fixes [value]
  @Input() disabled = false;

  @Output() valueChange = new EventEmitter<string>(); // ✅ this fixes (valueChange)

  // internal displayed text (keeps input controlled)
  inputValue = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.inputValue = this.value ?? '';
    }
  }

  onInput(e: Event): void {
    if (this.disabled) return;

    const v = (e.target as HTMLInputElement).value ?? '';
    this.inputValue = v;
    this.valueChange.emit(v);
  }
}
