import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-textarea-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manual-textarea.html',
  styleUrls: ['./manual-textarea.scss'],
})
export class ManualTextarea {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  autosize(el: HTMLTextAreaElement) {
    el.style.height = 'auto'; // allow shrink too
    el.style.height = `${el.scrollHeight}px`; // grow
  }
}
