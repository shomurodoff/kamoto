import { AuthModel } from "./_models";

const AUTH_LOCAL_STORAGE_KEY = "kt-auth-react-v";
const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return;
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);

  if (!lsValue) {
    return;
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel;
    if (auth) {
      // You can easily check auth_token expiration also

      return auth;
    }
  } catch (error) {
    console.error("AUTH LOCAL STORAGE PARSE ERROR", error);
  }
};

const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return;
  }

  try {
    const lsValue = JSON.stringify(auth);
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE SAVE ERROR", error);
  }
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE REMOVE ERROR", error);
  }
};

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = "application/json";
  axios.interceptors.request.use(
    (config: { headers: { Authorization: string } }) => {
      const auth = getAuth();
      if (auth && auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
      }
      return config;
    },
    (err: any) => Promise.reject(err)
  );
}

// const setCompanyId = (id: number | undefined) => {
//   if (!localStorage) {
//     return
//   }
//   try {
//     const lsValue = JSON.stringify(id)
//     localStorage.setItem(COMPANY_ID, lsValue)
//   } catch (error) {
//     console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
//   }
// }

// const getCompanyId = (): number | undefined => {
//   if (!localStorage) {
//     return
//   }

//   const lsValue: string | null = localStorage.getItem(COMPANY_ID)
//   if (!lsValue) {
//     return
//   }

//   try {
//     const auth: number = JSON.parse(lsValue)
//     if (auth) {
//       // You can easily check auth_token expiration also

//       return auth
//     }
//   } catch (error) {
//     console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
//   }
// }
export { getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY };
