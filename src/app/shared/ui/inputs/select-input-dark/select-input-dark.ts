import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectItem } from '../../../models/select-item';

@Component({
  selector: 'ui-select-input-dark',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-input-dark.html',
  styleUrl: './select-input-dark.scss',
})
export class SelectInputDark implements OnChanges {
  @Input() label = '';
  @Input() placeholder = '';

  // ✅ your existing name
  @Input() items: SelectItem[] = [];

  // ✅ NEW: controlled value from parent (selected id)
  @Input() value: number | string | null = null;

  // ✅ NEW: notify parent when user selects
  @Output() valueChange = new EventEmitter<number | string | null>();

  // ✅ Optional but helpful
  @Input() disabled = false;

  inputValue = '';
  selectedId: number | string | null = null;

  results: SelectItem[] = [];
  private allItems: SelectItem[] = [];

  // ✅ keyboard selection
  activeIndex = -1; // -1 means none selected/highlighted

  ngOnChanges(changes: SimpleChanges): void {
    // refresh cache when items changed
    if (changes['items']) {
      this.allItems = this.items ?? [];
    }

    // ✅ sync selectedId from parent value
    if (changes['value']) {
      this.selectedId = this.value ?? null;

      // show selected name in the input (if exists)
      const selected = this.allItems.find(x => x.id === this.selectedId);
      this.inputValue = selected?.name ?? '';
    }

    // close dropdown results when inputs change
    this.results = [];
    this.activeIndex = -1;
  }

  onSearch(e: Event) {
    if (this.disabled) return;

    const value = (e.target as HTMLInputElement).value;
    this.inputValue = value;

    const q = value.trim().toLowerCase();
    this.results = q
      ? this.allItems.filter(x => x.name.toLowerCase().includes(q)).slice(0, 20)
      : [...this.allItems];

    this.activeIndex = this.results.length ? 0 : -1;
  }

  // ✅ handle arrows + enter
  onKeydown(e: KeyboardEvent) {
  if (this.disabled) return;
  if (!this.results.length) return;

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      e.stopPropagation();

      this.activeIndex = Math.min(
        this.activeIndex + 1,
        this.results.length - 1
      );
      this.scrollActiveIntoView();
      break;

    case 'ArrowUp':
      e.preventDefault();
      e.stopPropagation();

      this.activeIndex = Math.max(this.activeIndex - 1, 0);
      this.scrollActiveIntoView();
      break;

    case 'Enter':
      e.preventDefault();
      e.stopPropagation();

      if (this.activeIndex >= 0 && this.activeIndex < this.results.length) {
        this.onItemSelected(this.results[this.activeIndex]);
      }
      break;

    case 'Escape':
      e.stopPropagation(); // prevent parent Escape handlers

      this.results = [];
      this.activeIndex = -1;
      break;

    default:
      // let other keys behave normally (typing, shortcuts)
      return;
  }
}


  // called by click OR by Enter selection
  onItemSelected(item: SelectItem): void {
    if (this.disabled) return;

    this.inputValue = item.name;
    this.selectedId = item.id;

    // ✅ NEW: emit to parent
    this.valueChange.emit(item.id);

    this.results = [];
    this.activeIndex = -1;
  }

  // ✅ NEW: allow parent to clear selection if needed
  clear(): void {
    if (this.disabled) return;

    this.inputValue = '';
    this.selectedId = null;
    this.results = [];
    this.activeIndex = -1;

    this.valueChange.emit(null);
  }

  // optional: hover updates activeIndex
  onHoverIndex(i: number) {
    this.activeIndex = i;
  }

  trackById = (_: number, item: SelectItem) => item.id;

  private scrollActiveIntoView() {
    queueMicrotask(() => {
      const el = document.querySelector('.input-search-li.active') as HTMLElement | null;
      el?.scrollIntoView({ block: 'nearest' });
    });
  }
}
