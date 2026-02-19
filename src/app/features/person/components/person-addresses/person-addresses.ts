
import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { finalize,Subject, forkJoin, takeUntil, distinctUntilChanged } from 'rxjs';

import { ReferenceAddressesService } from '../../../../shared/services/references/addressess/addresses.service';

import { ManualInput } from '../../../../shared/ui/inputs/manual-input/manual-input';
import { SelectInput } from '../../../../shared/ui/inputs/select-input/select-input';
import {
  SelectItem,
  CountryItem,
  RegionItem,
  ProvinceItem,
  CityItem,
  Id,
} from '../../../../shared/models/address-reference';
import { ViewItem } from '../../../../shared/ui/view/view-item/view-item';
import { AddressFormControls } from '../../../../shared/models/address-form';

type AnyId = number | string | null;

@Component({
  selector: 'app-person-addresses',
  standalone: true,
  imports: [CommonModule, NgIf, ReactiveFormsModule, ManualInput, SelectInput, ViewItem],
  templateUrl: './person-addresses.html',
  styleUrls: ['./person-addresses.scss'],
})
export class PersonAddresses implements OnInit, OnDestroy {
  @Input({ required: true }) form!: FormGroup<AddressFormControls>;
  @Input() isLocked = false;
  @Input() isEditMode = false;

  // mode
  isPhilippines = true;

  // visible lists
  countries: CountryItem[] = [];
  regions: RegionItem[] = [];
  provinces: ProvinceItem[] = [];
  cities: CityItem[] = [];
  barangays: SelectItem[] = [];

  // loading flags
  loadingRefs = false;
  loadingBarangays = false;

  // master lists (light)
  private allRegions: RegionItem[] = [];
  private allProvinces: ProvinceItem[] = [];
  private allCities: CityItem[] = [];

  // lookups for city-first upward selection
  private provinceById = new Map<number, ProvinceItem>();
  private cityById = new Map<number, CityItem>();

  // PH
  private philippinesId: AnyId = null;

  private readonly destroy$ = new Subject<void>();
  private readonly refSvc = inject(ReferenceAddressesService);
  private readonly cdr = inject(ChangeDetectorRef);


  ngOnInit(): void {
    this.preloadAllLightReferences();

    this.form.controls.countryId.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((countryId: AnyId) => this.onCountryChanged(countryId));

    this.form.controls.regionId.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((regionId: AnyId) => this.onRegionChanged(regionId));

    this.form.controls.provinceId.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((provinceId: AnyId) => this.onProvinceChanged(provinceId));

    this.form.controls.cityId.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((cityId: AnyId) => this.onCityChanged(cityId));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // =========================================================
  // Helpers (ID handling)
  // =========================================================
  private toNumberId(value: AnyId): number | null {
    const n = Number(value);
    return Number.isInteger(n) && n > 0 ? n : null;
  }

  private sameId(a: AnyId, b: AnyId): boolean {
    return String(a ?? '') === String(b ?? '');
  }

  // =========================================================
  // Preload (countries/regions/provinces/cities)
  // NOTE: uses your actual service method names
  // =========================================================
  private preloadAllLightReferences(): void {
    this.loadingRefs = true;

    forkJoin({
      countries: this.refSvc.getCountries(), // ✅ exists
      regions: this.refSvc.getRegions(),     // ✅ exists
      provinces: this.refSvc.getProvinces(), // ✅ exists
      cities: this.refSvc.getCities(),       // ✅ exists
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ countries, regions, provinces, cities }) => {
          this.countries = (countries ?? []) as CountryItem[];
          this.allRegions = (regions ?? []) as RegionItem[];
          this.allProvinces = (provinces ?? []) as ProvinceItem[];
          this.allCities = (cities ?? []) as CityItem[];

          this.buildLookups();

          // find PH id (could be number|string depending on backend)
          this.philippinesId = this.findPhilippinesId();

          // default country to PH if empty
          const currentCountry: AnyId = this.form.controls.countryId.value;
          if ((currentCountry === null || currentCountry === undefined) && this.philippinesId != null) {
            this.form.patchValue({ countryId: this.philippinesId }, { emitEvent: true });
          } else {
            // edit mode sync
            this.onCountryChanged(currentCountry);
            this.onRegionChanged(this.form.controls.regionId.value);
            this.onProvinceChanged(this.form.controls.provinceId.value);
            this.onCityChanged(this.form.controls.cityId.value);
          }

          this.loadingRefs = false;
        },
        error: () => {
          this.countries = [];
          this.allRegions = [];
          this.allProvinces = [];
          this.allCities = [];

          this.regions = [];
          this.provinces = [];
          this.cities = [];
          this.barangays = [];
          this.loadingRefs = false;
        },
      });
  }

  private buildLookups(): void {
    this.provinceById.clear();
    this.cityById.clear();

    for (const p of this.allProvinces) {
      const id = this.toNumberId(p.id as unknown as AnyId);
      if (id !== null) this.provinceById.set(id, p);
    }

    for (const c of this.allCities) {
      const id = this.toNumberId(c.id as unknown as AnyId);
      if (id !== null) this.cityById.set(id, c);
    }
  }

  private findPhilippinesId(): AnyId {
    const ph = (this.countries ?? []).find(
      (c) => (c.name ?? '').trim().toLowerCase() === 'philippines'
    );
    return ph?.id ?? null;
  }

  // =========================================================
  // Change handlers (city-first + barangay lazy)
  // =========================================================
  private onCountryChanged(countryId: AnyId): void {
    // determine PH (default true until countries load)
    const phId = this.philippinesId;
    this.isPhilippines = phId == null ? true : this.sameId(countryId, phId);

    if (!this.isPhilippines) {
      // International: hide PH selects + clear PH ids
      this.regions = [];
      this.provinces = [];
      this.cities = [];
      this.barangays = [];
      this.loadingBarangays = false;

      this.form.patchValue(
        { regionId: null, provinceId: null, cityId: null, barangayId: null },
        { emitEvent: false }
      );
      return;
    }

    // PH mode:
    // regions enabled ready
    this.regions =
      countryId == null
        ? []
        : this.allRegions.filter((r) => this.sameId(r.parentId as unknown as AnyId, countryId));

    // province list for display only (province is disabled in UI)
    const regionId: AnyId = this.form.controls.regionId.value;
    this.provinces =
      regionId == null
        ? []
        : this.allProvinces.filter((p) => this.sameId(p.parentId as unknown as AnyId, regionId));

    // city enabled always:
    // if provinceId null => allCities
    const provinceId: AnyId = this.form.controls.provinceId.value;
    this.cities =
      provinceId == null
        ? this.allCities.map(({ id, name }) => ({ id, name } as CityItem))
        : this.allCities
            .filter((c) => this.sameId(c.parentId as unknown as AnyId, provinceId))
            .map(({ id, name }) => ({ id, name } as CityItem));

    // reset barangays if no city
    const cityId: AnyId = this.form.controls.cityId.value;
    if (cityId == null) {
      this.form.patchValue({ barangayId: null }, { emitEvent: false });
      this.barangays = [];
      this.loadingBarangays = false;
    }
  }

  private onRegionChanged(regionId: AnyId): void {
    if (!this.isPhilippines) return;

    // update provinces list for display
    this.provinces =
      regionId == null
        ? []
        : this.allProvinces.filter((p) => this.sameId(p.parentId as unknown as AnyId, regionId));
  }

  private onProvinceChanged(provinceId: AnyId): void {
    if (!this.isPhilippines) return;

    // city list rule: province null => all cities
    this.cities =
      provinceId == null
        ? this.allCities.map(({ id, name }) => ({ id, name } as CityItem))
        : this.allCities
            .filter((c) => this.sameId(c.parentId as unknown as AnyId, provinceId))
            .map(({ id, name }) => ({ id, name } as CityItem));

    // province change invalidates barangay
    this.form.patchValue({ barangayId: null }, { emitEvent: false });
    this.barangays = [];
    this.loadingBarangays = false;
  }

  private onCityChanged(cityId: AnyId): void {
    if (!this.isPhilippines) return;

    // reset barangay whenever city changes
    this.form.patchValue({ barangayId: null }, { emitEvent: false });
    this.barangays = [];

    if (cityId == null) {
      this.loadingBarangays = false;
      return;
    }

    // 1) load barangays lazily (service expects number)
    this.loadBarangays(cityId);

    // 2) city-first upward selection: set provinceId + regionId
    const cityNum = this.toNumberId(cityId);
    if (cityNum === null) return;

    const city = this.cityById.get(cityNum);
    if (!city) return;

    const provinceNum = this.toNumberId(city.parentId as unknown as AnyId);
    if (provinceNum === null) return;

    const province = this.provinceById.get(provinceNum);
    const regionId: AnyId = province?.parentId ?? null;

    // patch upward without loops
    this.form.patchValue(
      { provinceId: provinceNum, regionId },
      { emitEvent: false }
    );

    // refresh lists (since we suppressed events)
    this.provinces =
      regionId == null
        ? []
        : this.allProvinces.filter((p) => this.sameId(p.parentId as unknown as AnyId, regionId));

    // after city picked, you can show only cities of that province
    this.cities = this.allCities
      .filter((c) => this.sameId(c.parentId as unknown as AnyId, provinceNum))
      .map(({ id, name }) => ({ id, name } as CityItem));
  }

  private loadBarangays(cityId: AnyId): void {
  const id = this.toNumberId(cityId);
  if (id === null) {
    this.barangays = [];
    this.loadingBarangays = false;
    this.cdr.markForCheck();
    return;
  }

  this.loadingBarangays = true;
  this.barangays = [];
  this.cdr.markForCheck();

  this.refSvc
    .getBarangaysByCityId(id)
    .pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        // ✅ always stop the spinner even if error happens
        this.loadingBarangays = false;
        this.cdr.markForCheck();
      })
    )
    .subscribe({
      next: (items) => {
        // If you already unified models, this can just be: this.barangays = items ?? [];
        const rows = items ?? [];
        this.barangays = rows
          .map((x) => {
            const bid = this.toNumberId((x as any)?.id ?? null);
            if (bid === null) return null;
            return { id: bid, name: String((x as any)?.name ?? '') };
          })
          .filter((x): x is { id: number; name: string } => x !== null);

        this.cdr.markForCheck();
      },
      error: () => {
        this.barangays = [];
        this.cdr.markForCheck();
      },
    });
}


  // =========================================================
  // Disable helpers (for template)
  // =========================================================
  get isRegionDisabled(): boolean {
    return this.isLocked || this.loadingRefs || !this.isPhilippines;
  }

  // province disabled always in your city-first mode
  get isProvinceDisabled(): boolean {
    return true;
  }

  // city enabled even when province is null
  get isCityDisabled(): boolean {
    return this.isLocked || this.loadingRefs || !this.isPhilippines;
  }

  get isBarangayDisabled(): boolean {
    return (
      this.isLocked ||
      this.loadingRefs ||
      this.loadingBarangays ||
      !this.isPhilippines ||
      !this.form.controls.cityId.value
    );
  }
}
