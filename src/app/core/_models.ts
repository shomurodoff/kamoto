export type ResponseType<T> = {
  success: boolean;
  data: T;
  errors: string[];
};

export type DropdownType = {
  name: string;
  value: string;
  id: number;
};

export type sidebarOptionsType = {
  id: number;
  slug: string;
  title: string;
};
