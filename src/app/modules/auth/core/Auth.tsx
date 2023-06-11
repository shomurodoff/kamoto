import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import { LayoutSplashScreen } from '../../../../_metronic/layout/core'
import { AuthModel, UserModel } from './_models'
import * as authHelper from './AuthHelpers'
import { getUserByToken } from './_requests'
import { WithChildren } from '../../../../_metronic/helpers'

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: Partial<UserModel> | undefined
  setCurrentUser: Dispatch<SetStateAction<Partial<UserModel> | undefined>>
  logout: () => void
  userToken: string | undefined
  setUserToken: Dispatch<SetStateAction<string | undefined>>
  personalityId: string | undefined
  storePersonalityId: Dispatch<SetStateAction<string | undefined>>
  investorId: number | undefined
  storeInvestorId: Dispatch<SetStateAction<number | undefined>>
  newPersonality: boolean | undefined
  setNewPersonality: Dispatch<SetStateAction<boolean | undefined>>
  showBillingModal: boolean
  setShowBillingModal: Dispatch<SetStateAction<boolean>>
  currentState: string
  setCurrentState: Dispatch<SetStateAction<string>>
  selected: string
  setSelected: Dispatch<SetStateAction<string>>
  currencyBill: string
  setCurrencyBill: Dispatch<SetStateAction<string>>
  billingData: any
  setBillingData: Dispatch<SetStateAction<any>>
  onboardingData: any
  setOnboardingData: Dispatch<SetStateAction<any>>
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  data: authHelper.getAuth(),
  saveAuth: () => { },
  currentUser: undefined,
  setCurrentUser: () => { },
  logout: () => { },
  userToken: undefined,
  setUserToken: () => { },
  personalityId: undefined,
  storePersonalityId: () => { },
  investorId: undefined,
  storeInvestorId: () => { },
  newPersonality: undefined,
  setNewPersonality: () => { },
  showBillingModal: false,
  setShowBillingModal: () => { },
  currentState: 'Monthly',
  setCurrentState: () => { },
  selected: 'Basic',
  setSelected: () => { },
  currencyBill: 'USD',
  setCurrencyBill: () => { },
  billingData: undefined,
  setBillingData: () => { },
  onboardingData: getOnboardingData(),
  setOnboardingData: () => { },
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<Partial<UserModel> | undefined>()
  const [userToken, setUserToken] = useState<string | undefined>()
  const [personalityId, storePersonalityId] = useState<string | undefined>()
  const [investorId, storeInvestorId] = useState<number | undefined>()
  const [newPersonality, setNewPersonality] = useState<boolean | undefined>()
  const [showBillingModal, setShowBillingModal] = useState<boolean>(false)
  const [currentState, setCurrentState] = useState<string>('Monthly')
  const [selected, setSelected] = useState('Basic')
  const [currencyBill, setCurrencyBill] = useState('USD')
  const [billingData, setBillingData] = useState<any>()
  const [onboardingData, setOnboardingData] = useState<any>()

  const saveAuth = async (auth: AuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);

      const { data } = await getUserByToken(auth.token)
      if (data) {
        setCurrentUser(data.data);
      }
    } else {
      authHelper.removeAuth();
    }
  };

  useEffect(() => {
    let onboarding = getOnboardingData()
    if (onboarding) {
      setOnboardingData(onboarding)
    }
  }, [])

  useEffect(() => {
    if (typeof onboardingData != undefined && onboardingData != undefined) {
      localStorage.setItem('onboarding_data', JSON.stringify(onboardingData))
    }
    if (onboardingData == null) {
      localStorage.removeItem('onboarding_data')
    }
  }, [onboardingData])

  const logout = async () => {
    await saveAuth(undefined)
    setCurrentUser(undefined)
    setUserToken(undefined)
    storePersonalityId(undefined)
    localStorage.removeItem('personalityId')
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        saveAuth,
        currentUser,
        setCurrentUser,
        logout,
        setUserToken,
        userToken,
        personalityId,
        storePersonalityId,
        investorId,
        storeInvestorId,
        newPersonality,
        setNewPersonality,
        showBillingModal,
        setShowBillingModal,
        currentState,
        setCurrentState,
        selected,
        setSelected,
        currencyBill,
        setCurrencyBill,
        billingData,
        setBillingData,
        onboardingData,
        setOnboardingData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { auth, logout, setCurrentUser } = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async (apiToken: string) => {
      try {
        if (!didRequest.current) {
          const { data } = await getUserByToken(apiToken)
          if (data) {
            setCurrentUser(data.data);
          }
        }
      } catch (error) {
        console.error(error);
        if (!didRequest.current) {
          logout();
        }
      } finally {
        setShowSplashScreen(false);
      }

      return () => (didRequest.current = true);
    };
    if (auth && auth.token) {
      requestUser(auth.token);
    } else {
      logout();
      setShowSplashScreen(false);
    }
    // eslint-disable-next-line
  }, []);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>;
};

function getOnboardingData() {
  const onboarding = localStorage.getItem('onboarding_data')
  return onboarding ? JSON.parse(onboarding) : null
}

export { AuthProvider, AuthInit, useAuth }
