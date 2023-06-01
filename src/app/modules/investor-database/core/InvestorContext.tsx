import {FC, useState, createContext, useContext, Dispatch, SetStateAction} from 'react'

import {WithChildren} from '../../../../_metronic/helpers'

type InvestorContextProps = {
  searchValue: string | undefined
  storeSearchValue: Dispatch<SetStateAction<string | undefined>>
  companyName: string | undefined
  setCompanyName: Dispatch<SetStateAction<string | undefined>>
  investorUser: string | undefined
  setinvestorUser: Dispatch<SetStateAction<string | undefined>>
  investorId: string | undefined
  storeInvestorId: Dispatch<SetStateAction<string | undefined>>
  investorDbFilter: boolean
  setInvestorDbFilter: Dispatch<SetStateAction<boolean>>
  sort_by_investorDb: string | undefined
  set_sort_by_investorDb: Dispatch<SetStateAction<string | undefined>>
  sort_order_investorDb: string | undefined
  set_sort_order_investorDb: Dispatch<SetStateAction<string | undefined>>
}

const initInvestorContextPropsState = {
  searchValue: undefined,
  storeSearchValue: () => {},
  companyName: undefined,
  setCompanyName: () => {},
  investorUser: undefined,
  setinvestorUser: () => {},
  investorId: undefined,
  storeInvestorId: () => {},
  investorDbFilter: false,
  setInvestorDbFilter: () => {},
  sort_by_investorDb: undefined,
  set_sort_by_investorDb: () => {},
  sort_order_investorDb: undefined,
  set_sort_order_investorDb: () => {},
}

const InvestorContext = createContext<InvestorContextProps>(initInvestorContextPropsState)

const useInvestorDatabase = () => {
  return useContext(InvestorContext)
}

const InvestorDatabaseProvider: FC<WithChildren> = ({children}) => {
  const [searchValue, storeSearchValue] = useState<string | undefined>()
  const [companyName, setCompanyName] = useState<string | undefined>()
  const [investorUser, setinvestorUser] = useState<string | undefined>()
  const [investorId, storeInvestorId] = useState<string | undefined>()

  //InvestorDB
  const [investorDbFilter, setInvestorDbFilter] = useState<boolean>(false)
  const [sort_by_investorDb, set_sort_by_investorDb] = useState<string | undefined>(undefined)
  const [sort_order_investorDb, set_sort_order_investorDb] = useState<string | undefined>(undefined)
  return (
    <InvestorContext.Provider
      value={{
        searchValue,
        storeSearchValue,
        setCompanyName,
        companyName,
        setinvestorUser,
        investorUser,
        investorId,
        storeInvestorId,
        investorDbFilter,
        setInvestorDbFilter,
        sort_by_investorDb,
        set_sort_by_investorDb,
        sort_order_investorDb,
        set_sort_order_investorDb,
      }}
    >
      {children}
    </InvestorContext.Provider>
  )
}

export {InvestorDatabaseProvider, useInvestorDatabase}
