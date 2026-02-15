import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AddressReferencesDto, BarangayListDto } from './addresses.dto';
import { ChildSelectItem, SelectItem } from '../../../models/select-item';

@Injectable({ providedIn: 'root' })
export class ReferenceDataApi {
  private readonly API_BASE = 'https://speedx-api.azurewebsites.net/api/address-references';

  constructor(private http: HttpClient) {}

  /**
   * RAW backend response
   * Do NOT map here
   */
  getUpToCity(): Observable<AddressReferencesDto> {
    return this.http.get<AddressReferencesDto>(`${this.API_BASE}/up-to-city`);
  }

  /**
   * RAW backend response
   * Do NOT map here
   * Loads barangays ONLY for the selected city
   */
  getBarangaysByCityId(cityId: number): Observable<BarangayListDto> {
    return this.http.get<BarangayListDto>(`${this.API_BASE}/barangays-by-city-id/${cityId}`);
  }

  
}
