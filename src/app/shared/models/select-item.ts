export type SelectItem = {
  id: number | string;
  name: string;
};

export type ChildSelectItem = SelectItem & {
  parentId: number | string;
};
