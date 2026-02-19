import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectItem } from '../../../models/address-reference';

@Component({
  selector: 'ui-select-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-input.html',
  styleUrls: ['./select-input.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInput),
      multi: true,
    },
  ],
})
export class SelectInput implements OnChanges, ControlValueAccessor {
  // ---------------- CVA internals ----------------
  private onChange: (value: number | string | null) => void = () => {};
  private onTouched: () => void = () => {};

  /** the form value (selected id). Source of truth for CVA */
  private value: number | string | null = null;

  /** CVA: Angular writes into the component */
  writeValue(value: number | string | null): void {
    this.value = value ?? null;
    this.isUserTyping = false;
    this.syncDisplayFromValue();
    this.closeDropdown();
  }

  registerOnChange(fn: (value: number | string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) this.closeDropdown();
  }

  // ---------------- Inputs ----------------
  @Input() label = '';
  @Input() placeholder = '';
  @Input() loading = false;

  /** list of options */
  @Input() items: SelectItem[] = [];

  /** allow disabling from template; CVA may override via setDisabledState */
  @Input() disabled = false;

  // ---------------- Optional outputs ----------------
  /** Useful if parent wants the full object when selection changes */
  @Output() itemChange = new EventEmitter<SelectItem | null>();

  // ---------------- UI state ----------------
  inputValue = '';
  results: SelectItem[] = [];
  activeIndex = -1;

  /**
   * Prevent dropdown auto-opening when value is set programmatically.
   * Only show dropdown results when user is typing.
   */
  private isUserTyping = false;

  ngOnChanges(changes: SimpleChanges): void {
    // If items changed, re-map display text for current value
    if (changes['items']) {
      // do NOT flip isUserTyping to true here
      this.syncDisplayFromValue();
      // keep dropdown closed unless user is actively typing
      if (!this.isUserTyping) this.closeDropdown();
      // if user is typing and loading finished, re-filter
      if (this.isUserTyping && !this.loading && !this.disabled && this.inputValue) {
        this.filterResults(this.inputValue);
      }
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

  // ---------------- Template handlers ----------------
  onSearch(e: Event): void {
    if (this.disabled || this.loading) return;

    this.isUserTyping = true;

    const text = (e.target as HTMLInputElement).value ?? '';
    this.inputValue = text;

    this.filterResults(text);

    /**
     * Optional behavior:
     * If user starts typing, clear the selected value.
     * Keep it if you want "type-to-search but keep selection until pick".
     */
    if (this.value !== null) {
      this.setValue(null, null, /*emitItem*/ true);
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

    // ✅ CVA: mark as touched
    this.onTouched();

    // allow click selection before closing
    setTimeout(() => this.closeDropdown(), 120);
  }

  onHoverIndex(i: number): void {
    this.activeIndex = i;
  }

  onItemSelected(item: SelectItem): void {
    if (this.disabled || this.loading) return;

    this.isUserTyping = false;

    this.inputValue = item.name ?? '';
    this.setValue(item.id ?? null, item, /*emitItem*/ true);

    this.closeDropdown();
  }

  onClearClick(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (this.disabled || this.loading) return;

    this.isUserTyping = false;
    this.inputValue = '';
    this.setValue(null, null, /*emitItem*/ true);
    this.closeDropdown();
  }

  trackById = (_: number, item: SelectItem) => item.id;

  // ---------------- Helpers ----------------
  private setValue(value: number | string | null, item: SelectItem | null, emitItem: boolean): void {
    // internal
    this.value = value;

    // ✅ CVA: update the FormControl
    this.onChange(value);

    // ✅ CVA: consider change as interaction
    this.onTouched();

    // optional output
    if (emitItem) this.itemChange.emit(item);
  }

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

  private syncDisplayFromValue(): void {
    if (this.value === null || this.value === undefined) {
      // if user is typing, don't wipe their text
      if (!this.isUserTyping) this.inputValue = '';
      return;
    }

    // robust compare (string/number id)
    const found = (this.items ?? []).find((x) => String(x.id) === String(this.value));
    const name = found?.name ?? '';

    // if user is typing, don't overwrite live typing
    if (!this.isUserTyping) this.inputValue = name;
  }
}
