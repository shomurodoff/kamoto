import axios from "axios";
import { serialize } from "../../../core/_util";
import { GET_FILE_URL } from "../../investor-database/core/_requests";
const API_URL = process.env.REACT_APP_BASE_API_URL;

export const GET_COLUMN_LIST = `${API_URL}/column/list`;
const ADD_CUSTOM_FIELD = `${API_URL}/investor/custom-field`;
const GET_CUSTOM_FIELD = `${API_URL}/investor/custom-field`;
const UPDATE_CUSTOM_FIELD = `${API_URL}/investor/update-custom-field`;
const DELETE_CUSTOM_FIELD = `${API_URL}/investor/delete-custom-field`;
const UPDATE_INDEX = `${API_URL}/columns/position`;
const GET_ALL_INVESTOR_USERS = `${API_URL}/investor-user/investor`;
const GET_INVESTOR_RESPONSE = `${API_URL}/investor/investor-response`;

export const getColumnList = (id: number) => {
  return axios.get(`${GET_COLUMN_LIST}/${id}`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const getActiveRound = (personalityId: string) => {
  return axios.get(`${API_URL}/round/active/${personalityId}`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const getAllRounds = (personalityId: string) => {
  return axios.get(`${API_URL}/round/list/${personalityId}`, {
    validateStatus(status) {
      return true;
    },
  });
};
export const getRoundById = (roundId: number) => {
  return axios.get(`${API_URL}/round/${roundId}`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const deleteRoundById = (roundId: number) => {
  return axios.delete(`${API_URL}/round/${roundId}`, {
    validateStatus(status) {
      return true;
    },
  });
};
export const getAllColumnsFromRoundId = (
  roundId: number,
  search?: string,
  sort_by_investor?: string,
  sort_order_investor?: string
) => {
  const object = {
    searchfilter: search,
    sort_by: sort_by_investor,
    sort_order: sort_order_investor,
  };
  return axios.get(`${API_URL}/column/list/${roundId}?${serialize(object)}`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const updateColumnFromApi = ({
  columnId,
  investorId,
  isFavourite,
  roundId,
}: any) => {
  return axios.put(
    `${API_URL}/investor-column`,
    {
      columnId,
      investorId,
      isFavourite,
      roundId,
    },
    {
      validateStatus(status) {
        return true;
      },
    }
  );
};

export const addColumn = ({
  columnName,
  color,
  roundId,
}: {
  columnName: string;
  color: string;
  roundId: number;
}) => {
  return axios.post(
    `${API_URL}/column`,
    {
      columnName,
      color,
      roundId,
    },
    {
      validateStatus(status) {
        return true;
      },
    }
  );
};

export const editColumn = ({
  columnName,
  color,
  columnId,
}: {
  columnName: string;
  color: string;
  columnId: number;
}) => {
  return axios.put(
    `${API_URL}/column/${columnId}`,
    {
      columnName,
      color,
    },
    {
      validateStatus(status) {
        return true;
      },
    }
  );
};

export const deleteColumn = (columnId: number) => {
  return axios.delete(`${API_URL}/column/${columnId}`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const getInvestorApi = (personalityId: string, type?: string) => {
  return axios.get(
    `${API_URL}/company/investor/${personalityId}?type=${type ? type : ""}`,
    {
      validateStatus(status) {
        return true;
      },
    }
  );
};

export const addInvestor = (values: any) => {
  return axios.post(
    `${API_URL}/investor/crm`,
    {
      investorId: parseInt(values.investorId),
      roundId: parseInt(values.roundId),
      isFavourite: false,
      columnId: values.columnId !== null ? parseInt(values.columnId) : 1,
    },
    {
      validateStatus(status) {
        return true;
      },
    }
  );
};

export const createTransactionApi = (values: any) => {
  return axios.post(`${API_URL}/investment/confirm`, values, {
    validateStatus(status) {
      return true;
    },
  });
};

export const rejectTransactionApi = (values: any) => {
  return axios.post(`${API_URL}/investment/reject`, values, {
    validateStatus(status) {
      return true;
    },
  });
};
export const createActivity = (values: any) => {
  return axios.post(`${API_URL}/activity`, values, {
    validateStatus(status) {
      return true;
    },
  });
};

export const getAllActivities = (
  companyId: string,
  investorId: number,
  type: string,
  activitySearch: string,
  filterActivity: string | undefined,
  sort_by_activity: string | undefined,
  sort_order_activty: string | undefined,
  limit?: number
) => {
  const object = {
    search: activitySearch,
    sort_by: sort_by_activity,
    sort_order: sort_order_activty,
    limit: limit,
  };
  let queryString = serialize(object);
  if (filterActivity && filterActivity.length > 0) {
    if (queryString.length > 0) {
      queryString = `${queryString}&${filterActivity}`;
    } else {
      queryString = `${filterActivity}`;
    }
  }

  return axios.get(
    `${API_URL}/activity/${companyId}/${investorId}?type=${type}&${queryString}`,
    {
      validateStatus(status) {
        return true;
      },
    }
  );
};

export const editActivity = (values: any) => {
  return axios.put(`${API_URL}/activity`, values, {
    validateStatus(status) {
      return true;
    },
  });
};
export const exportAcivity = (values: any) => {
  return axios.post(`${API_URL}/activity/csv/export`, values, {
    validateStatus(status) {
      return true;
    },
  });
};

export const exportAllInvestors = (values: any) => {
  return axios.post(`${API_URL}/investor/csv/export`, values, {
    validateStatus(status) {
      return true;
    },
  });
};

export const getAllUsers = (personalityId: string) => {
  return axios.get(`${API_URL}/user/${personalityId}`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const addCustomField = (data: any) => {
  return axios.post(ADD_CUSTOM_FIELD, data, {
    validateStatus(status) {
      return true;
    },
  });
};

export const getCustomField = (investorId: number, roundId: number) => {
  return axios.get(`${GET_CUSTOM_FIELD}/${investorId}/${roundId}`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const updateCustomField = (customId: number, data: any) => {
  return axios.put(`${UPDATE_CUSTOM_FIELD}/${customId}`, data, {
    validateStatus(status) {
      return true;
    },
  });
};

export const deleteCustomField = (id: number) => {
  return axios.delete(`${DELETE_CUSTOM_FIELD}/${id}`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const updateActiveRoundInCompany = (data: any) => {
  return axios.put(`${API_URL}/company/active-round`, data, {
    validateStatus(status) {
      return true;
    },
  });
};

export const updateColumnIndex = (columns: any, roundId: number) => {
  return axios.put(
    `${UPDATE_INDEX}/${roundId}`,
    { columns },
    {
      validateStatus(status) {
        return true;
      },
    }
  );
};

export const deleteInvestorColumn = (obj: {
  investorId: number;
  columnId: number;
}) => {
  return axios.delete(
    `${API_URL}/investor-column/${obj.investorId}/${obj.columnId}`,
    {
      validateStatus(status) {
        return true;
      },
    }
  );
};

export const getAllInvestorUsers = (investorId: number) => {
  return axios.get(`${GET_ALL_INVESTOR_USERS}/${investorId}`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const getInvestorResponseAPI = (investorId: number, roundId: number) => {
  return axios.get(`${GET_INVESTOR_RESPONSE}/${investorId}/${roundId}`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const downloadFileSigned = (activiyName: string) => {
  return axios.get(`${GET_FILE_URL}/signed/${activiyName}`, {
    validateStatus(status) {
      return true;
    },
  });
};
