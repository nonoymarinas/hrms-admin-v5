export type Id = number;

export interface SelectItem {
  id: Id;
  name: string;
}

export interface ChildSelectItem extends SelectItem {
  parentId: Id;
}

// Semantic aliases (optional but readable)
export type CountryItem = SelectItem;
export type RegionItem = ChildSelectItem;   // parentId = countryId
export type ProvinceItem = ChildSelectItem; // parentId = regionId
export type CityItem = ChildSelectItem;     // parentId = provinceId

