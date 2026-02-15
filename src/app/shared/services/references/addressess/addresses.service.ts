import { Injectable } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { SelectItem, ChildSelectItem } from '../../../models/select-item';
import { ReferenceDataApi } from './addresses.api';
import { AddressReferencesDto, BarangayListDto } from './addresses.dto';

type AddressReferencesMapped = {
  countries: SelectItem[];
  regions: ChildSelectItem[];
  provinces: ChildSelectItem[];
  cities: ChildSelectItem[];
};

@Injectable({ providedIn: 'root' })
export class ReferenceAddressesService {
  private refs$?: Observable<AddressReferencesMapped>;

  constructor(private api: ReferenceDataApi) {}

  /** Load everything once + cache */
  private getAll(): Observable<AddressReferencesMapped> {
    if (!this.refs$) {
      this.refs$ = this.api.getUpToCity().pipe(
        map((dto: AddressReferencesDto) => ({
          countries: dto.countries.map(c => ({
            id: c.countryId,
            name: c.countryName,
          })),
          regions: dto.regions.map(r => ({
            id: r.regionId,
            name: r.regionName,
            parentId: r.countryId,
          })),
          provinces: dto.provinces.map(p => ({
            id: p.provinceId,
            name: p.provinceName,
            parentId: p.regionId,
          })),
          cities: dto.cities.map(c => ({
            id: c.cityId,
            name: c.cityName,
            parentId: c.provinceId,
          })),
        })),
        shareReplay(1)
      );
    }
    return this.refs$;
  }

  getCountries(): Observable<SelectItem[]> {
    return this.getAll().pipe(map(x => x.countries));
  }

  getRegions(): Observable<ChildSelectItem[]> {
    return this.getAll().pipe(map(x => x.regions));
  }

  getProvinces(): Observable<ChildSelectItem[]> {
    return this.getAll().pipe(map(x => x.provinces));
  }

  getCities(): Observable<ChildSelectItem[]> {
    return this.getAll().pipe(map(x => x.cities));
  }

  // ---------- Separate API call (barangay) ----------
  /**
   * ✅ Barangays are NOT cached with refs$
   * ✅ Loaded ONLY after city selection
   */
getBarangaysByCityId(cityId: number): Observable<SelectItem[]> {
  return this.api.getBarangaysByCityId(cityId).pipe(
    map((res: BarangayListDto) =>
      (res.barangays ?? []).map(b => ({
        id: b.barangayId,
        name: b.barangayName,
        parentId: b.cityId,
      }))
    )
  );
}


  clearCache(): void {
    this.refs$ = undefined;
  }

}
