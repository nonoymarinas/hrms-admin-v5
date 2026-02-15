import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';

import { ManualInput } from '../../../../shared/ui/inputs/manual-input/manual-input';
import { SelectInput } from '../../../../shared/ui/inputs/select-input/select-input';
import { SelectItem } from '../../../../shared/models/select-item';
import { ViewItem } from '../../../../shared/ui/view/view-item/view-item';

@Component({
  selector: 'app-person-addresses',
  standalone: true,
  imports: [CommonModule, ManualInput, SelectInput, ViewItem, NgIf],
  templateUrl: './person-addresses.html',
  styleUrls: ['./person-addresses.scss'],
})
export class PersonAddresses implements OnChanges {
  // ---------- Inputs ----------
  @Input() isLocked = false;
  @Input() isEditMode = false;

  /** Parent controls this. Template switches with *ngIf="isPhilippines" */
  @Input() isPhilippines = true;

  @Input() countries: SelectItem[] = [];
  @Input() regions: SelectItem[] = [];
  @Input() provinces: SelectItem[] = [];
  @Input() cities: SelectItem[] = [];
  @Input() barangays: SelectItem[] = [];

  @Input() isBarangayLoading = false;

  // Selected IDs (source of truth = parent)
  @Input() selectedCountryId: number | string | null = null;
  @Input() selectedRegionId: number | string | null = null;
  @Input() selectedProvinceId: number | string | null = null;
  @Input() selectedCityId: number | string | null = null;
  @Input() selectedBarangayId: number | string | null = null;

  // Non-PH text fields (source of truth = parent)
  @Input() regionText = '';
  @Input() provinceText = '';
  @Input() cityText = '';

  // Address lines (source of truth = parent)
  @Input() addressLine1 = '';
  @Input() addressLine2 = '';
  @Input() postalCode = '';

  // ---------- Outputs ----------
  @Output() countryChange = new EventEmitter<number | string | null>();
  @Output() regionChange = new EventEmitter<number | string | null>();
  @Output() provinceChange = new EventEmitter<number | string | null>();
  @Output() cityChange = new EventEmitter<number | string | null>();
  @Output() barangayChange = new EventEmitter<number | string | null>();

  @Output() regionTextChange = new EventEmitter<string>();
  @Output() provinceTextChange = new EventEmitter<string>();
  @Output() cityTextChange = new EventEmitter<string>();

  @Output() addressLine1Change = new EventEmitter<string>();
  @Output() addressLine2Change = new EventEmitter<string>();
  @Output() postalCodeChange = new EventEmitter<string>();

  // ---------- Derived UI states ----------
  isRegionDisabled = true;
  isProvinceDisabled = true;
  isCityDisabled = true;
  isBarangayDisabled = true;

  isRegionTextDisabled = true;
  isProvinceTextDisabled = true;
  isCityTextDisabled = true;

  ngOnChanges(_changes: SimpleChanges): void {
    this.computeDisabledStates();
  }

  // ---------- UI -> Parent events ----------
  onCountryValueChange(countryId: number | string | null): void {
    this.countryChange.emit(countryId);

    // downstream resets are parent responsibility,
    // but emitting nulls keeps old behavior consistent
    this.regionChange.emit(null);
    this.provinceChange.emit(null);
    this.cityChange.emit(null);
    this.barangayChange.emit(null);
  }

  onRegionValueChange(regionId: number | string | null): void {
    this.regionChange.emit(regionId);

    this.provinceChange.emit(null);
    this.cityChange.emit(null);
    this.barangayChange.emit(null);
  }

  onProvinceValueChange(provinceId: number | string | null): void {
    this.provinceChange.emit(provinceId);

    this.cityChange.emit(null);
    this.barangayChange.emit(null);
  }

  onCityValueChange(cityId: number | string | null): void {
    this.cityChange.emit(cityId);
    this.barangayChange.emit(null);
  }

  onBarangayValueChange(barangayId: number | string | null): void {
    this.barangayChange.emit(barangayId);
  }

  // Non-PH text inputs
  onRegionTextChanged(v: string): void {
    this.regionTextChange.emit(v ?? '');
  }

  onProvinceTextChanged(v: string): void {
    this.provinceTextChange.emit(v ?? '');
  }

  onCityTextChanged(v: string): void {
    this.cityTextChange.emit(v ?? '');
  }

  // Address lines
  onAddressLine1Changed(v: string): void {
    this.addressLine1Change.emit(v ?? '');
  }

  onAddressLine2Changed(v: string): void {
    this.addressLine2Change.emit(v ?? '');
  }

  onPostalCodeChanged(v: string): void {
    this.postalCodeChange.emit(v ?? '');
  }

  // ---------- Rules ----------
  private computeDisabledStates(): void {
    const locked = this.isLocked;

    const hasCountry = this.hasValue(this.selectedCountryId);
    const hasRegion = this.hasValue(this.selectedRegionId);
    const hasProvince = this.hasValue(this.selectedProvinceId);
    const hasCity = this.hasValue(this.selectedCityId);

    if (locked) {
      this.isRegionDisabled = true;
      this.isProvinceDisabled = true;
      this.isCityDisabled = true;
      this.isBarangayDisabled = true;

      this.isRegionTextDisabled = true;
      this.isProvinceTextDisabled = true;
      this.isCityTextDisabled = true;
      return;
    }

    if (this.isPhilippines) {
      // ✅ city-first requirement: city enabled if PH (parent already controls options)
      this.isCityDisabled = !hasCountry;

      // Region/Province can be optional in city-first mode:
      this.isRegionDisabled = !hasCountry;
      this.isProvinceDisabled = !hasRegion;

      // barangay depends on city + not loading
      this.isBarangayDisabled = !(hasCity && !this.isBarangayLoading);

      // text fields disabled
      this.isRegionTextDisabled = true;
      this.isProvinceTextDisabled = true;
      this.isCityTextDisabled = true;
    } else {
      // PH dropdowns disabled
      this.isRegionDisabled = true;
      this.isProvinceDisabled = true;
      this.isCityDisabled = true;
      this.isBarangayDisabled = true;

      // Non-PH text enabled
      this.isRegionTextDisabled = false;
      this.isProvinceTextDisabled = false;
      this.isCityTextDisabled = false;
    }
  }

  private hasValue(v: any): boolean {
    return v !== null && v !== undefined && String(v) !== '';
  }
}
