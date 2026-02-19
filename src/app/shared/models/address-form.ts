import { FormControl } from '@angular/forms';

export type AddressFormControls = {
  countryId: FormControl<number | string | null>;

  // Philippines path (IDs)
  regionId: FormControl<number | string | null>;
  provinceId: FormControl<number | string | null>;
  cityId: FormControl<number | string | null>;
  barangayId: FormControl<number | string | null>;

  // International path (free text)
  regionText: FormControl<string | null>;
  provinceText: FormControl<string | null>;
  cityText: FormControl<string | null>;
  suburbText: FormControl<string | null>;

  // Common fields
  addressLine1: FormControl<string | null>;
  addressLine2: FormControl<string | null>;
  postalCode: FormControl<string | null>;
};
