import axios from "axios";
import { serialize } from "../../../core/_util";
const API_URL = process.env.REACT_APP_BASE_API_URL;

const CREATE_INVESTOR = `${API_URL}/investor`;
const CREATE_INVESTOR_USER = `${API_URL}/investor-users`;
const GET_ALL_INVESTOR = `${API_URL}/investor`;
const GET_SINGLE_INVESTOR = `${API_URL}/investor`;
const GET_SINGLE_INVESTOR_USER = `${API_URL}/investor-user`;
export const GET_FILE_URL = `${API_URL}/file`;
const CREATE_INVESTOR_INVESTMENT = `${API_URL}/investment`;
const UPDATE_INVESTOR = `${API_URL}/investor`;
const GET_ALL_INVESTOR_USER = `${API_URL}/investor-user/investor`;
export const GET_INDUSTRY = `${API_URL}/industry`;
const GET_ACTIVE_ROUND = `${API_URL}/round/active`;
const ADD_TO_CRM = `${API_URL}/investor/crm`;
const ADD_TO_FAVORITE = `${API_URL}/investor-user/favorites`;
const ADD_INVESTOR_TO_FAVORITE = `${API_URL}/investor-column`;
const GET_ALL_INVESTMENTS = `${API_URL}/investments/investor`;
const CREATE_ERROR_REPORT = `${API_URL}/errorReport`;
const GET_ALL_STAGE_FOCUS = `${API_URL}/stageFocus`;
const GET_ALL_INVESTOR_GEOGRAPHY = `${API_URL}/investorGeography`;
const GET_INVESTOR_LOCATION = `${API_URL}/investorLocation`;
const GET_FOCUS_AREA = `${API_URL}/focusArea`;

export const addInvestor = (values: any) => {
  return axios.post(
    CREATE_INVESTOR,
    {
      name: values.investorName,
      description: values.description,
      company: values.company,
      phone: values.phone.toString(),
      countryId: Number(values.country),
      fileId: Number(values.profileImageId),
      facebook_url: values.socialMedia.facebook,
      twitter_url: values.socialMedia.twitter,
      insta_url: values.socialMedia.instagram,
      website: values.website,
      linkedin_url: values.socialMedia.linkedin,
      exits: values.exits,
      industries: values.industries,
    },
    {
      validateStatus(status) {
        return true;
      },
    }
  );
};

export const updateInvestor = (investorId: number, data: any) => {
  return axios.put(`${UPDATE_INVESTOR}/${investorId}`, data, {
    validateStatus(status) {
      return true;
    },
  });
};

export const addInvestorUser = (
  values: any,
  investorId: string | undefined
) => {
  return axios.post(
    CREATE_INVESTOR_USER,
    {
      name: values.fullName,
      email: values.email,
      designation: values.designation,
      linkedin_url: values.linkedIn,
      fileId: +values.profileImageId,
      investorId: investorId,
    },
    {
      validateStatus(status) {
        return true;
      },
    }
  );
};

export const addInvestorInvestments = (
  values: any,
  investorId: number | undefined
) => {
  return axios.post(
    CREATE_INVESTOR_INVESTMENT,
    {
      announced_date: values.announced_date,
      organization_name: values.organization_name,
      funding_round: values.funding_round,
      money_raised: values.money_raised,
      lead_investor: values.lead_investor,
      info: values.info,
      currencyId: Number(values.currencyId),
      investorId: investorId,
    },
    {
      validateStatus(status) {
        return true;
      },
    }
  );
};

export const getAllInvestor = (
  type: string,
  searchValue: string | undefined,
  sort_by_investorDb: string | undefined,
  sort_order_investorDb: string | undefined,
  personalityId: string | undefined,
  subType?: string | undefined,
  page?: number,
  size?: number
) => {
  const object = {
    name: searchValue,
    sort_by: sort_by_investorDb,
    sort_order: sort_order_investorDb,
    subType: subType,
    page: page,
    size: size,
  };

  return axios.get(
    `${GET_ALL_INVESTOR}/company/${personalityId}?type=${type}&${serialize(
      object
    )}`,
    {
      validateStatus(status) {
        return true;
      },
    }
  );
};

export const getSingleInvestor = (investorId: number) => {
  return axios.get(`${GET_SINGLE_INVESTOR}/${investorId}`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const getSingleInvestorUser = (userId: number) => {
  return axios.get(`${GET_SINGLE_INVESTOR_USER}/${userId}`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const AllInvestorUser = (
  investorId: number,
  name?: string,
  sortBy?: string,
  sortOrder?: string
) => {
  if (name) {
    return axios.get(`${GET_ALL_INVESTOR_USER}/${investorId}?name=${name}`, {
      validateStatus(status) {
        return true;
      },
    });
  } else {
    return axios.get(
      `${GET_ALL_INVESTOR_USER}/${investorId}?sort_order=${sortBy}&sort_by=${sortOrder}`,
      {
        validateStatus(status) {
          return true;
        },
      }
    );
  }
};

export const getIndustry = () => {
  return axios.get(GET_INDUSTRY, {
    validateStatus(status) {
      return true;
    },
  });
};

export const getActiveRound = (personalityId: string | undefined) => {
  return axios.get(`${GET_ACTIVE_ROUND}/${personalityId}`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const getAddToCRMData = (data: {
  roundId: Number | undefined;
  investorId: Number | undefined;
  isFavourite: boolean;
  columnId?: Number | undefined;
}) => {
  if (data.columnId === undefined) {
    return axios.post(
      ADD_TO_CRM,
      {
        roundId: data.roundId,
        investorId: data.investorId,
        isFavourite: data.isFavourite,
      },
      {
        validateStatus(status) {
          return true;
        },
      }
    );
  } else {
    return axios.post(ADD_TO_CRM, data, {
      validateStatus(status) {
        return true;
      },
    });
  }
};

export const AddToFavorite = (data: {
  columnId?: number | undefined;
  isFavourite: boolean;
  investorUserId: number;
  roundId: number | undefined;
}) => {
  return axios.post(ADD_TO_FAVORITE, data, {
    validateStatus(status) {
      return true;
    },
  });
};

export const AddInvestorToFavorite = (data: {
  investorId: number;
  columnId: number | undefined;
  isFavourite: boolean;
  roundId: number | undefined;
}) => {
  if (data.columnId) {
    return axios.put(ADD_INVESTOR_TO_FAVORITE, data, {
      validateStatus(status) {
        return true;
      },
    });
  } else {
    return axios.put(
      ADD_INVESTOR_TO_FAVORITE,
      {
        investorId: data.investorId,
        isFavourite: data.isFavourite,
        roundId: data.roundId,
      },
      {
        validateStatus(status) {
          return true;
        },
      }
    );
  }
};

export const getAllInvestments = (
  investorId: number,
  sortOrder: string,
  sortBy: string
) => {
  return axios.get(
    `${GET_ALL_INVESTMENTS}/${investorId}?sort_order=${sortOrder}&sort_by=${sortBy}`
  );
};

//create Investor

export const createInvestor = (data: any) => {
  return axios.post(CREATE_INVESTOR, data, {
    validateStatus(status) {
      return true;
    },
  });
};

export const createErrorReportAPI = (data: {
  reason: string;
  investorId?: number;
  InvestorUserId?: number;
}) => {
  return axios.post(CREATE_ERROR_REPORT, data, {
    validateStatus(status) {
      return true;
    },
  });
};

export const getStageFocus = () => {
  return axios.get(`${GET_ALL_STAGE_FOCUS}`);
};

export const getInvestorGeography = () => {
  return axios.get(`${GET_ALL_INVESTOR_GEOGRAPHY}`);
};

export const getInvestorLocation = () => {
  return axios.get(`${GET_INVESTOR_LOCATION}`);
};

export const getFocusArea = () => {
  return axios.get(`${GET_FOCUS_AREA}`);
};
