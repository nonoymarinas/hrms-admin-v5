export interface AddressReferencesDto {
  countries: CountryDto[];
  regions: RegionDto[];
  provinces: ProvinceDto[];
  cities: CityDto[];
}

export interface CountryDto {
  countryId: number;
  countryName: string;
}

export interface RegionDto {
  regionId: number;
  regionName: string;
  countryId: number;
}

export interface ProvinceDto {
  provinceId: number;
  provinceName: string;
  regionId: number;
}

export interface CityDto {
  cityId: number;
  cityName: string;
  provinceId: number;
}
export interface BarangayDto {
  barangayId: number;
  barangayName: string;
  cityId: number;
}

export interface BarangayListDto {
  hasError: boolean;
  errorMessage: string;
  statusCodeNumber: number;
  barangays: BarangayDto[];
}

