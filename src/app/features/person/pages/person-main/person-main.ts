import {
  Component,
  signal,
  computed,
  OnInit,
  ChangeDetectorRef,
  DestroyRef,
  inject,
  effect,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatButtonModule } from '@angular/material/button';

import { PersonBasic } from '../../components/person-basic/person-basic';
import { PersonContact } from '../../components/person-contact/person-contact';
import { PersonAddresses } from '../../components/person-addresses/person-addresses';
import { PersonBenifits } from '../../components/person-benifits/person-benifits';
import { PersonCompensations } from '../../components/person-compensations/person-compensations';
import { PersonEmployments } from '../../components/person-employments/person-employments';

import { ButtonType01 } from '../../../../shared/ui/button/button-type-01/button-type-01';
import { ButtonType02 } from '../../../../shared/ui/button/button-type-02/button-type-02';

import { SelectItem, ChildSelectItem } from '../../../../shared/models/select-item';
import { ReferenceAddressesService } from '../../../../shared/services/references/addressess/addresses.service';

@Component({
  selector: 'app-person-main',
  standalone: true,
  imports: [
    PersonBasic,
    MatButtonModule,
    PersonContact,
    PersonAddresses,
    PersonBenifits,
    PersonCompensations,
    PersonEmployments,
    ButtonType01,
    ButtonType02,
    ReactiveFormsModule,
  ],
  templateUrl: './person-main.html',
  styleUrls: ['./person-main.scss'],
})
export class PersonMain implements OnInit {
  //#region constructor
  constructor(
    private fb: FormBuilder,
    private ref: ReferenceAddressesService,
    private cdr: ChangeDetectorRef,
  ) {}
  private destroyRef = inject(DestroyRef);
  //#endregion constructor

  //#region basic lock
  personId = signal<number | null>(null);

  isLocked = computed(() => {
    const id = Number(this.personId());
    return !(Number.isInteger(id) && id > 0);
  });

  private lockEffect = effect(() => {
    if (!this.addressForm) return;

    if (this.isLocked()) {
      this.addressForm.disable({ emitEvent: false });
      return;
    }

    this.addressForm.enable({ emitEvent: false });
    this.syncAddressControlStates();
  });
  //#endregion basic lock

  //#region init
  ngOnInit(): void {
    this.buildAddressForm();

    // TEMP unlock
    this.personId.set(123);

    // initialize signal mirror from initial form value
    this.selectedCountryId.set(this.addressForm.get('countryId')?.value ?? null);

    this.loadAddressReferences();
    this.wireAddressFormReactivity();
  }
  //#endregion init

  //#region PERSONAL INFO
  isPersonInfoBtnSaveActive = true;
  isPersonInfoBtnEditActive = false;

  editCancelBtnLabel = 'edit';
  saveUpdateBtnLabel = 'save';

  isPersonInfoEditMode = true;

  onClickedSavePersInfoBtn(): void {
    this.isPersonInfoBtnSaveActive = false;
    this.isPersonInfoBtnEditActive = true;
    this.editCancelBtnLabel = 'edit';
    this.saveUpdateBtnLabel = 'save';
    this.isPersonInfoEditMode = false;
  }

  onClickedEditPersInfoBtn(): void {
    if (this.isPersonInfoEditMode) this.cancelPersonInfoEdit();
    else this.startPersonInfoEdit();
  }

  private startPersonInfoEdit(): void {
    this.isPersonInfoBtnSaveActive = true;
    this.isPersonInfoBtnEditActive = true;
    this.editCancelBtnLabel = 'cancel';
    this.saveUpdateBtnLabel = 'update';
    this.isPersonInfoEditMode = true;
  }

  private cancelPersonInfoEdit(): void {
    if (!this.restoreOriginalPersonInfoValues()) return;

    this.isPersonInfoEditMode = false;
    this.isPersonInfoBtnSaveActive = false;
    this.isPersonInfoBtnEditActive = true;
    this.editCancelBtnLabel = 'edit';
    this.saveUpdateBtnLabel = 'save';
  }

  private restoreOriginalPersonInfoValues(): boolean {
    return true;
  }
  //#endregion PERSONAL INFO

  //#region CONTACT
  isContactSaveBtnActive = true;
  isContactEditBtnActive = false;

  contactEditBtnLabel = 'edit';
  contactSaveBtnLabel = 'save';

  isContactEditMode = true;

  onClickedSaveContactBtn(): void {
    this.isContactSaveBtnActive = false;
    this.isContactEditBtnActive = true;
    this.contactEditBtnLabel = 'edit';
    this.contactSaveBtnLabel = 'save';
    this.isContactEditMode = false;
  }

  onClickedEditContactBtn(): void {
    if (this.isContactEditMode) this.cancelContactEdit();
    else this.startContactEdit();
  }

  private startContactEdit(): void {
    this.isContactSaveBtnActive = true;
    this.isContactEditBtnActive = true;
    this.contactEditBtnLabel = 'cancel';
    this.contactSaveBtnLabel = 'update';
    this.isContactEditMode = true;
  }

  private cancelContactEdit(): void {
    if (!this.restoreOriginalContactValues()) return;

    this.isContactEditMode = false;
    this.isContactSaveBtnActive = false;
    this.isContactEditBtnActive = true;
    this.contactEditBtnLabel = 'edit';
    this.contactSaveBtnLabel = 'save';
  }

  private restoreOriginalContactValues(): boolean {
    return true;
  }
  //#endregion CONTACT

  //#region ADDRESS
  // buttons
  isAddressSaveBtnActive = true;
  isAddressEditBtnActive = false;

  addressEditBtnLabel = 'edit';
  addressSaveBtnLabel = 'save';

  isAddressEditMode = true;

  onClickedSaveAddressBtn(): void {
    this.saveAddress();

    this.isAddressSaveBtnActive = false;
    this.isAddressEditBtnActive = true;
    this.addressEditBtnLabel = 'edit';
    this.addressSaveBtnLabel = 'save';
    this.isAddressEditMode = false;
  }

  onClickedEditAddressBtn(): void {
    if (this.isAddressEditMode) this.cancelAddressEdit();
    else this.startAddressEdit();
  }

  private startAddressEdit(): void {
    this.isAddressSaveBtnActive = true;
    this.isAddressEditBtnActive = true;
    this.addressEditBtnLabel = 'cancel';
    this.addressSaveBtnLabel = 'update';
    this.isAddressEditMode = true;
  }

  private cancelAddressEdit(): void {
    if (!this.restoreOriginalAddressValues()) return;

    this.isAddressEditMode = false;
    this.isAddressSaveBtnActive = false;
    this.isAddressEditBtnActive = true;
    this.addressEditBtnLabel = 'edit';
    this.addressSaveBtnLabel = 'save';
  }

  private restoreOriginalAddressValues(): boolean {
    return true;
  }

  // form
  addressForm!: FormGroup;

  /** SIGNAL mirror of form countryId (FormControl is not signal-reactive) */
  selectedCountryId = signal<number | string | null>(null);

  // UI lists
  countries: SelectItem[] = [];
  regions: SelectItem[] = [];
  provinces: SelectItem[] = [];
  cities: SelectItem[] = [];
  barangays: SelectItem[] = [];

  // master data
  private allRegions: ChildSelectItem[] = [];
  private allProvinces: ChildSelectItem[] = [];
  private allCities: ChildSelectItem[] = [];

  // loaded flags
  isRegionsLoaded = false;
  isProvincesLoaded = false;
  isCitiesLoaded = false;

  /** true = loaded/idle, false = loading */
  isBarangaysLoaded = true;

  private get philippinesId(): number | string | null {
    const ph = this.countries.find((c) => (c.name ?? '').toLowerCase() === 'philippines');
    return ph?.id ?? null;
  }

  /** ✅ Reacts (depends on signal) */
  isPhilippines = computed(() => {
    const current = this.selectedCountryId();
    const phId = this.philippinesId;

    // before countries load, default to PH UI
    if (phId == null) return true;

    return String(current ?? '') === String(phId);
  });

  private get isPH(): boolean {
    return this.isPhilippines();
  }

  private isValidId(value: number | string | null): boolean {
    const n = Number(value);
    return Number.isInteger(n) && n > 0;
  }

  // // child emits ids
  // onCountryChanged(countryId: number | string | null): void {
  //   // immediate update for UI switch
  //   this.selectedCountryId.set(countryId);

  //   this.addressForm.patchValue(
  //     {
  //       countryId,

  //       regionId: null,
  //       provinceId: null,
  //       cityId: null,
  //       barangayId: null,

  //       regionText: '',
  //       provinceText: '',
  //       cityText: '',

  //       addressLine1: '',
  //       addressLine2: '',
  //       postalCode: '',
  //     },
  //     { emitEvent: true },
  //   );

  //   // reset dependent option lists
  //   this.provinces = [];
  //   this.barangays = [];
  //   this.isBarangaysLoaded = true;

  //   // refresh regions list for PH
  //   this.regions = this.isPH ? this.allRegions.map(({ id, name }) => ({ id, name })) : [];

  //   // ✅ city-first list behavior
  //   this.refreshCityOptions();

  //   this.syncAddressControlStates();
  // }

  // onRegionChanged(regionId: number | string | null): void {
  //   this.addressForm.patchValue(
  //     { regionId, provinceId: null, cityId: null, barangayId: null },
  //     { emitEvent: true },
  //   );
  // }

  // onProvinceChanged(provinceId: number | string | null): void {
  //   this.addressForm.patchValue(
  //     { provinceId, cityId: null, barangayId: null },
  //     { emitEvent: true },
  //   );
  // }

  // onCityChanged(cityId: number | string | null): void {
  //   this.addressForm.patchValue(
  //     {
  //       cityId,
  //       barangayId: null,
  //       addressLine1: '',
  //       addressLine2: '',
  //       postalCode: '',
  //     },
  //     { emitEvent: true },
  //   );
  // }

  // onBarangayChanged(barangayId: number | string | null): void {
  //   this.addressForm.patchValue({ barangayId }, { emitEvent: true });
  // }

  private buildAddressForm(): void {
    this.addressForm = this.fb.group({
      countryId: [null],

      addressLine1: [''],
      addressLine2: [''],
      postalCode: [''],

      regionId: [{ value: null, disabled: true }],
      provinceId: [{ value: null, disabled: true }],
      cityId: [{ value: null, disabled: true }],
      barangayId: [{ value: null, disabled: true }],

      regionText: [{ value: '', disabled: true }],
      provinceText: [{ value: '', disabled: true }],
      cityText: [{ value: '', disabled: true }],
    });
  }

  private loadAddressReferences(): void {
    this.ref
      .getCountries()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((rows) => {
        this.countries = rows ?? [];

        // default PH if none selected
        if (!this.addressForm.get('countryId')?.value) {
          const phId = this.philippinesId;
          if (phId != null) {
            this.addressForm.patchValue({ countryId: phId }, { emitEvent: true });
          }
        }

        // keep signal in sync (important)
        this.selectedCountryId.set(this.addressForm.get('countryId')?.value ?? null);

        this.syncAddressControlStates();
      });

    this.ref
      .getRegions()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((rows) => {
        this.allRegions = (rows ?? []).map((x: any) => ({
          id: x.id,
          name: x.name,
          parentId: x.parentId,
        }));
        this.isRegionsLoaded = true;

        this.regions = this.isPH ? this.allRegions.map(({ id, name }) => ({ id, name })) : [];
        this.syncAddressControlStates();
      });

    this.ref
      .getProvinces()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((rows) => {
        this.allProvinces = (rows ?? []).map((x: any) => ({
          id: x.id,
          name: x.name,
          parentId: x.parentId,
        }));
        this.isProvincesLoaded = true;
      });

    this.ref
      .getCities()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((rows) => {
        this.allCities = (rows ?? []).map((x: any) => ({
          id: x.id,
          name: x.name,
          parentId: x.parentId,
        }));

        this.isCitiesLoaded = true;

        this.refreshCityOptions();
        this.syncAddressControlStates();
      });
  }

  private wireAddressFormReactivity(): void {
    // country changes -> refresh lists + toggle fields
    this.addressForm
      .get('countryId')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((countryId) => {
        this.selectedCountryId.set(countryId ?? null);

        this.regions = this.isPH ? this.allRegions.map(({ id, name }) => ({ id, name })) : [];
        this.provinces = [];
        this.barangays = [];
        this.isBarangaysLoaded = true;

        this.refreshCityOptions();
        this.syncAddressControlStates();
      });

    // region -> provinces
    this.addressForm
      .get('regionId')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((regionId) => {
        this.provinces = [];
        this.barangays = [];
        this.isBarangaysLoaded = true;

        const rid = Number(regionId);
        if (this.isPH && this.isValidId(regionId)) {
          this.provinces = this.allProvinces
            .filter((p) => Number(p.parentId) === rid)
            .map(({ id, name }) => ({ id, name }));
        }

        this.refreshCityOptions();
        this.syncAddressControlStates();
      });

    // province -> cities filter + reset barangays
    this.addressForm
      .get('provinceId')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.barangays = [];
        this.isBarangaysLoaded = true;

        this.refreshCityOptions();
        this.syncAddressControlStates();
      });

    // ✅ city -> auto province/region + load barangays (PH city-first)
    this.addressForm
      .get('cityId')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((cityId) => {
        // non-PH: no barangay behavior
        if (!this.isPH) {
          this.barangays = [];
          this.isBarangaysLoaded = true;
          this.syncAddressControlStates();
          return;
        }

        // reset barangays
        this.barangays = [];
        this.isBarangaysLoaded = true;

        if (!this.isValidId(cityId)) {
          this.syncAddressControlStates();
          return;
        }

        // ✅ auto-fill province + region (if empty)
        this.syncUpProvinceAndRegionFromCity(cityId);

        // ✅ load barangays
        this.isBarangaysLoaded = false;
        this.syncAddressControlStates();

        const id = Number(cityId);
        this.ref
          .getBarangaysByCityId(id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (items) => {
              this.barangays = items ?? [];
              this.isBarangaysLoaded = true;
              this.syncAddressControlStates();
              this.cdr.markForCheck();
            },
            error: (err) => {
              this.barangays = [];
              this.isBarangaysLoaded = true;
              console.log('Barangays API ERROR:', err);
              console.log('Error body:', err?.error);
              this.syncAddressControlStates();
            },
          });
      });
  }

  private refreshCityOptions(): void {
    // ✅ Non-PH: no city dropdown list needed
    if (!this.isPH) {
      this.cities = [];
      return;
    }

    const provinceId = this.addressForm.get('provinceId')?.value;

    // ✅ city-first: if no province selected => show ALL cities
    if (!this.isValidId(provinceId)) {
      this.cities = this.allCities.map(({ id, name }) => ({ id, name }));
      return;
    }

    // else filter by province
    const pid = Number(provinceId);
    this.cities = this.allCities
      .filter((c) => Number(c.parentId) === pid)
      .map(({ id, name }) => ({ id, name }));
  }

 private syncUpProvinceAndRegionFromCity(cityId: number | string | null): void {
  if (!this.isPH) return;

  // only auto-fill if province is empty (city-first mode)
  const currentProvince = this.addressForm.get('provinceId')?.value;
  if (this.isValidId(currentProvince)) return;
  if (!this.isValidId(cityId)) return;

  const cid = Number(cityId);

  // City → Province
  const cityRow = this.allCities.find((c) => Number(c.id) === cid);
  const provinceId = cityRow ? Number(cityRow.parentId) : 0;
  if (!Number.isInteger(provinceId) || provinceId <= 0) return;

  // Province → Region
  const provRow = this.allProvinces.find((p) => Number(p.id) === provinceId);
  const regionId = provRow ? Number(provRow.parentId) : 0;
  if (!Number.isInteger(regionId) || regionId <= 0) return;

  // ✅ patch without emitting to avoid loops
  this.addressForm.patchValue(
    { regionId, provinceId },
    { emitEvent: false },
  );

  // ✅ make sure dropdowns have correct items so labels appear
  this.regions = this.allRegions.map(({ id, name }) => ({ id, name }));

  this.provinces = this.allProvinces
    .filter((p) => Number(p.parentId) === regionId)
    .map(({ id, name }) => ({ id, name }));

  // OPTIONAL:
  // If you want to KEEP city list = ALL cities even after auto province,
  // comment this out.
  this.refreshCityOptions();

  this.cdr.markForCheck();
}


  private syncAddressControlStates(): void {
    if (!this.addressForm) return;

    const locked = this.isLocked();
    const isPH = this.isPH;

    const regionCtrl = this.addressForm.get('regionId');
    const provinceCtrl = this.addressForm.get('provinceId');
    const cityCtrl = this.addressForm.get('cityId');
    const barangayCtrl = this.addressForm.get('barangayId');

    const regionTextCtrl = this.addressForm.get('regionText');
    const provinceTextCtrl = this.addressForm.get('provinceText');
    const cityTextCtrl = this.addressForm.get('cityText');

    // PH IDs
    if (!locked && isPH && this.isRegionsLoaded) regionCtrl?.enable({ emitEvent: false });
    else regionCtrl?.disable({ emitEvent: false });

    if (!locked && isPH && this.isValidId(regionCtrl?.value) && this.provinces.length > 0)
      provinceCtrl?.enable({ emitEvent: false });
    else provinceCtrl?.disable({ emitEvent: false });

    // ✅ city-first: PH only, enabled once cities loaded
    if (!locked && isPH && this.isCitiesLoaded) cityCtrl?.enable({ emitEvent: false });
    else cityCtrl?.disable({ emitEvent: false });

    // barangay enabled if city selected + loaded
    if (!locked && isPH && this.isValidId(cityCtrl?.value) && this.isBarangaysLoaded)
      barangayCtrl?.enable({ emitEvent: false });
    else barangayCtrl?.disable({ emitEvent: false });

    // Non-PH text fields
    if (!locked && !isPH) {
      regionTextCtrl?.enable({ emitEvent: false });
      provinceTextCtrl?.enable({ emitEvent: false });
      cityTextCtrl?.enable({ emitEvent: false });
    } else {
      regionTextCtrl?.disable({ emitEvent: false });
      provinceTextCtrl?.disable({ emitEvent: false });
      cityTextCtrl?.disable({ emitEvent: false });
    }
  }

  private saveAddress(): void {
    const address = this.addressForm.getRawValue();
    console.log('ADDRESS DATA (parent):', address);
  }
  //#endregion ADDRESS
}
