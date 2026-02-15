import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectItem } from '../../../models/select-item';

@Component({
  selector: 'ui-select-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-input.html',
  styleUrls: ['./select-input.scss'],
})
export class SelectInput implements OnChanges {
  // ---------- Inputs ----------
  @Input() label = '';
  @Input() placeholder = '';
  @Input() loading = false;

  // List of options
  @Input() items: SelectItem[] = [];

  // Selected id from parent (source of truth)
  @Input() value: number | string | null = null;

  // Disabled from parent
  @Input() disabled = false;

  // ---------- Outputs ----------
  @Output() valueChange = new EventEmitter<number | string | null>();
  @Output() itemChange = new EventEmitter<SelectItem | null>();

  // ---------- UI state ----------
  inputValue = '';
  results: SelectItem[] = [];
  activeIndex = -1;

  /**
   * ✅ Prevent dropdown auto-opening when value is set programmatically.
   * Only show dropdown results when user is actively typing.
   */
  private isUserTyping = false;

  ngOnChanges(changes: SimpleChanges): void {
    // ✅ when parent changes selected value OR items update, re-sync display
    if (changes['value'] || changes['items']) {
      this.isUserTyping = false; // programmatic
      this.syncDisplayFromValue();
      this.closeDropdown();
    }

    if (changes['disabled'] && this.disabled) {
      this.closeDropdown();
    }

    if (changes['loading']) {
      if (this.loading) {
        this.closeDropdown();
      } else if (this.isUserTyping && !this.disabled && this.inputValue) {
        this.filterResults(this.inputValue);
      }
    }
  }

  // ---------- Template handlers ----------
  onSearch(e: Event): void {
    if (this.disabled || this.loading) return;

    this.isUserTyping = true;

    const text = (e.target as HTMLInputElement).value ?? '';
    this.inputValue = text;

    this.filterResults(text);

    // optional: when user types, clear selection
    if (this.value !== null) {
      this.emitSelection(null, null);
    }
  }

  onKeydown(e: KeyboardEvent): void {
    if (this.disabled || this.loading) return;
    if (!this.results.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        e.stopPropagation();
        this.activeIndex = Math.min(this.activeIndex + 1, this.results.length - 1);
        return;

      case 'ArrowUp':
        e.preventDefault();
        e.stopPropagation();
        this.activeIndex = Math.max(this.activeIndex - 1, 0);
        return;

      case 'Enter':
        e.preventDefault();
        e.stopPropagation();
        if (this.activeIndex >= 0 && this.activeIndex < this.results.length) {
          this.onItemSelected(this.results[this.activeIndex]);
        }
        return;

      case 'Escape':
        e.preventDefault();
        e.stopPropagation();
        this.closeDropdown();
        return;
    }
  }

  onBlur(): void {
    this.isUserTyping = false;
    setTimeout(() => this.closeDropdown(), 120);
  }

  onHoverIndex(i: number): void {
    this.activeIndex = i;
  }

  onItemSelected(item: SelectItem): void {
    if (this.disabled || this.loading) return;

    this.isUserTyping = false;

    this.inputValue = item.name ?? '';
    this.emitSelection(item.id ?? null, item);

    this.closeDropdown();
  }

  // optional clear button hook (if your html has it)
  onClearClick(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (this.disabled || this.loading) return;

    this.isUserTyping = false;
    this.inputValue = '';
    this.emitSelection(null, null);
    this.closeDropdown();
  }

  trackById = (_: number, item: SelectItem) => item.id;

  // ---------- Helpers ----------
  private filterResults(text: string): void {
    const q = (text ?? '').trim().toLowerCase();
    if (!q) {
      this.results = [];
      this.activeIndex = -1;
      return;
    }

    this.results = (this.items ?? []).filter((x) =>
      String(x.name ?? '').toLowerCase().includes(q),
    );

    this.activeIndex = this.results.length ? 0 : -1;
  }

  private closeDropdown(): void {
    this.results = [];
    this.activeIndex = -1;
  }

  private emitSelection(value: number | string | null, item: SelectItem | null): void {
    // parent updates [value] after this emit
    this.valueChange.emit(value);
    this.itemChange.emit(item);
  }

  private syncDisplayFromValue(): void {
    if (this.value === null || this.value === undefined) {
      this.inputValue = '';
      return;
    }

    // ✅ robust compare (string/number id)
    const found = (this.items ?? []).find((x) => String(x.id) === String(this.value));
    this.inputValue = found?.name ?? '';
  }
}
