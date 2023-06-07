export type CompanyFieldsType = {
  companyName: string;
  tagline: string;
  teamSize: string;
  legalName: string;
  operatingStatus: string;
  description: string;
  foundedDate: string;
  industry: string;
  country: string;
  state: string;
  logoId: number | null;
  founders: string;
  socialMedia: {
    website: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
};

export type ProfileCompanyFieldsType = {
  name: string;
  tagline: string;
  teamSize: string;
  legalName: string;
  operatingStatus: string;
  description: string;
  foundedDate: string;
  industry: string;
  countryId: string;
  stateId: string;
  logoId: number | null;
  founders: string;
  companyId: number;
  website: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
};
export type SelectOptionType = {
  id: number;
  name: string;
  value: number;
};

export type socialMediaType = {
  id: number;
  icon: string;
  iconLable: string;
  placeholder: string;
  fieldName: string;
};

export type EmailPreferencesInputType = {
  id: number;
  title: string;
  subtitle: string;
};

export type EmailPreferencesOutputType = {
  id: number;
  title: string;
  value: boolean;
};

export type ProfileType = {
  communication: { email: boolean; phone: boolean };
  contact: number;
  country: string;
  designation: string;
  email: string;
  firstName: string;
  lastName: string;
  logoId: number;
};

export type getCompanyMetaIdType = {
  companyMetaId: number;
  key: string;
  value: string;
  createdAt: string;
  updatedAt: string;
};

export type LocaleValueType = {
  locale: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  timestampFormat: string;
};
