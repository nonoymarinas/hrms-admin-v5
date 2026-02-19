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

import { MatButtonModule } from '@angular/material/button';

import { PersonBasic } from '../../components/person-basic/person-basic';
import { PersonContact } from '../../components/person-contact/person-contact';
import { PersonAddresses } from '../../components/person-addresses/person-addresses';
import { PersonBenifits } from '../../components/person-benifits/person-benifits';
import { PersonCompensations } from '../../components/person-compensations/person-compensations';
import { PersonEmployments } from '../../components/person-employments/person-employments';

import { ButtonType01 } from '../../../../shared/ui/button/button-type-01/button-type-01';
import { ButtonType02 } from '../../../../shared/ui/button/button-type-02/button-type-02';

import { AddressFormControls } from '../../../../shared/models/address-form';

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
    private cdr: ChangeDetectorRef, // keep if you still use it elsewhere
  ) {}
  private destroyRef = inject(DestroyRef); // keep if you still use it elsewhere
  //#endregion constructor

  //#region form
  addressForm!: FormGroup<AddressFormControls>;
  //#endregion form

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
    } else {
      this.addressForm.enable({ emitEvent: false });
    }
  });
  //#endregion basic lock

  //#region init
  ngOnInit(): void {
    this.addressForm = this.fb.group<AddressFormControls>({
      countryId: this.fb.control<number | string | null>(null),

      regionId: this.fb.control<number | string | null>(null),
      provinceId: this.fb.control<number | string | null>(null),
      cityId: this.fb.control<number | string | null>(null),
      barangayId: this.fb.control<number | string | null>(null),

      regionText: this.fb.control<string | null>(null),
      provinceText: this.fb.control<string | null>(null),
      cityText: this.fb.control<string | null>(null),
      suburbText: this.fb.control<string | null>(null),

      addressLine1: this.fb.control<string | null>(null),
      addressLine2: this.fb.control<string | null>(null),
      postalCode: this.fb.control<string | null>(null),
    });

    // TEMP unlock
    this.personId.set(123);
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

  private saveAddress(): void {
    const address = this.addressForm.getRawValue();
    console.log('ADDRESS DATA (parent):', address);
  }
  //#endregion ADDRESS
}
