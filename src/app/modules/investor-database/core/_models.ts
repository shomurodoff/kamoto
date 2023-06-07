export interface AuthModel {
  token: string;
}

export interface InvestorModel {
  investorId: number;
  name: string;
  phone: string;
  fund_size: number;
  fund_type: string;
  sweet_spot: string;
  description: string;
  website: string;
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
  insta_url: string;
  stage_focus: string;
  investment_range: string;
  exits: number;
  investorUsers: [];
  investments: [];
  allIndustries: [];
  value_add: string;
  investment_count: number;
  founders: string;
  investorTeamSize: number;
  investorLocations: [];
  funding_requirement: string;
  stageFocuses: [];
  investorFocusAreas: [];
  investorGeographies: [];

  file: {
    name: string;
  };
  currency: {
    code: string;
    symbol: string;
  };
  columns: any;
}

export type InvestorUser = {
  name: string;
  designation: string;
  investor: {
    website: string;
    facebook_url: string;
    linkedin_url: string;
    twitter_url: string;
    insta_url: string;
    fund_type: any;
    fund_size: string;
    sweet_spot: string;
    stage_focus: string;
    investment_range: string;
    focus_area: any;
    exits: string;
    investments: string;
  };
};
