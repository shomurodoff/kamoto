import {PageLink} from '../../../../_metronic/layout/core'
import {useInvestorDatabase} from './InvestorContext'
import {useIntl} from 'react-intl'

export const InvestorDatabase = () => {
  const intl = useIntl()

  const InvestorDatabaseProspectiveBreadCrumbs: Array<PageLink> = [
    {
      title: intl.formatMessage({id: 'Home'}),
      path: '/',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  const InvestorDatabaseExistingBreadCrumbs: Array<PageLink> = [
    {
      title: intl.formatMessage({id: 'Home'}),
      path: '/',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  const InvestorDatabaseBreadCrumbs: Array<PageLink> = [
    {
      title: intl.formatMessage({id: 'Home'}),
      path: '/',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]
  return {
    InvestorDatabaseBreadCrumbs,
    InvestorDatabaseProspectiveBreadCrumbs,
    InvestorDatabaseExistingBreadCrumbs,
  }
}
export const Constants = () => {
  const intl = useIntl()
  const {companyName, investorId} = useInvestorDatabase()

  const IndividualInvestorBreadCrumbs: Array<PageLink> = [
    {
      title: intl.formatMessage({id: 'Home'}),
      path: '/',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
    {
      title: intl.formatMessage({id: 'Investor Database'}),
      path: '/investor-database/prospective-investor',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
    // {
    //   title: `${companyName}`,
    //   path: '',
    //   isSeparator: false,
    //   isActive: false,
    // },
  ]

  const ImportInvestorBreadCrumbs: Array<PageLink> = [
    {
      title: 'Home',
      path: '/',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
    {
      title: intl.formatMessage({id: 'Investor Database'}),
      path: '/investor-database/prospective-investor',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  const IndividualInvestorUserBreadCrumbs: Array<PageLink> = [
    {
      title: intl.formatMessage({id: 'Home'}),
      path: '/',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
    {
      title: intl.formatMessage({id: 'Investor Database'}),
      path: '/investor-database/prospective-investor',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
    {
      title: `${companyName}`,
      path: `/investor-database/individual-investor/${investorId}`,
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  return {
    IndividualInvestorBreadCrumbs,
    IndividualInvestorUserBreadCrumbs,
    ImportInvestorBreadCrumbs,
  }
}

export const CreateInvestorBreadCrumbs: Array<PageLink> = [
  {
    title: 'Home',
    path: '/',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
  {
    title: 'Settings',
    path: '',
    isSeparator: false,
    isActive: false,
  },
]

export const options = [
  {value: 'Seed Funds', label: 'Seed Funds'},
  {value: 'Series A', label: 'Series A'},
  {value: 'Series B', label: 'Series B'},
  {value: 'Series C', label: 'Series C'},
  {value: 'Series D', label: 'Series D'},
]
export const investorType = [
  {value: 'Venture Capital', label: 'Venture Capital'},
  {value: 'Angel Investors', label: 'Angel Investors'},
  {value: 'Individual Investor', label: 'Individual Investor'},
  {value: 'Institutional Investors', label: 'Institutional Investors'},
  {value: 'Corporate Investors', label: 'Corporate Investors'},
  {value: 'Crowdfunding', label: 'Crowdfunding'},
  {value: 'Private Equity', label: 'Private Equity'},
  {value: 'Family Offices', label: 'Family Offices'},
  {value: 'Accelerators', label: 'Accelerators'},
  {value: 'Incubators', label: 'Incubators'},
  {value: 'Government Grants', label: 'Government Grants'},
  {value: 'Friends and Family', label: 'Friends and Family'},
]

export const recordOptions = [
  {
    id: 1,
    name: 'Skip',
    value: 'Skip',
  },
  {
    id: 2,
    name: 'Include',
    value: 'Include',
  },
]

export const leftDummyData = [
  'Salutation',
  'First Name',
  'Contact Id',
  'Office Phone',
  'Last name',
  'Mobile phone',
  'Organization name',
  'Home phone',
  'Lead source',
  'Secondary phone',
  'Home phone2',
  'Lead source2',
  'Secondary phone2',
]

export const importInvestorTable = [
  {
    id: 1,
    name: 'Company Name',
  },
  {
    id: 2,
    name: 'User name',
  },
  {
    id: 3,
    name: 'user email',
  },
  {
    id: 4,
    name: 'Phone number',
  },
]

export const sortInvestorDbConst = [
  {id: 1, name: 'select sorting order', value: '', disabled: true},
  {id: 2, name: '(asc) fundsize ', value: 'fund_size-ASC'},
  {id: 3, name: '(desc) fundsize ', value: 'fund_size-DESC'},
  {id: 2, name: '(asc) createdAt ', value: 'createdAt-ASC'},
  {id: 3, name: '(desc) createdAt ', value: 'createdAt-DESC'},
]

export const designationOptions: any[] = [
  {
    id: 1,
    name: 'Series B - Saltbox',
    value: 'Series B - Saltbox',
  },
  {
    id: 2,
    name: 'Series A - Daylight',
    value: 'Series A - Daylight',
  },
  {
    id: 3,
    name: 'Seed Round - Bridge ...',
    value: 'Seed Round - Bridge ...',
  },
]

export const errorReportsConstant = [
  {id: 26, name: 'Investor Profile is incorrect.', value: 'Investor Profile is incorrect.'},
  {
    id: 27,
    name: "Investor's Investment Thesis is incorrect.",
    value: "Investor's Investment Thesis is incorrect.",
  },
  {
    id: 28,
    name: "Investor's Social media profiles are incorrect.",
    value: "Investor's Social media profiles are incorrect.",
  },
  {
    id: 29,
    name: "The contact person's information is incorrect.",
    value: "The contact person's information is incorrect.",
  },
  {id: 30, name: 'The investor/fund has been closed.', value: 'The investor/fund has been closed.'},
  {id: 31, name: 'Others', value: 'Others'},
]
