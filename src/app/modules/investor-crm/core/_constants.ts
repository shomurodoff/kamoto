export const InvestmentConfirmationInitialValues = {
  roundId: '',
  currencyId: '',
  amount: '',
  termSheetStatus: '',
  additionalTermsandCoditions: '',
}

export const InvestmentRejectionInitialValues = {
  rejectReason: '',
  investorUserId: '',
  rejectDate: '',
  contactAgainDate: '',
  feedBackDetailReason: '',
}

export const rejectionReasons = [
  {id: 1, name: 'Too early for Investor', value: 'Too early for Investor'},
  {id: 2, name: 'Need more traction', value: 'Need more traction'},
  {
    id: 3,
    name: 'Investor have no thesis on this sector',
    value: 'Investor have no thesis on this sector',
  },
  {id: 4, name: 'Team is not well balanced', value: 'Team is not well balanced'},
  {
    id: 5,
    name: 'Investor do not believe in the vision/idea',
    value: 'Investor do not believe in the vision/idea',
  },
  {id: 6, name: 'Product is not ready', value: 'Product is not ready'},
  {id: 7, name: 'Business plan is weak', value: 'Business plan is weak'},
  {id: 8, name: 'Others', value: 'Others'},
]

export const termSheetStatusValues = [
  {id: 1, name: 'Term sheet under review', value: 'Term sheet under review'},
  {id: 2, name: 'Term sheet signed', value: 'Term sheet signed'},
  {id: 3, name: 'Term sheet signature pending', value: 'Term sheet signature pending'},
  {id: 4, name: 'Term sheet pending', value: 'Term sheet pending'},
  {id: 5, name: 'Term sheet finalized', value: 'Term sheet finalized'},
  {id: 6, name: 'Legal review in progress', value: 'Legal review in progress'},
  {id: 7, name: 'Money Invested', value: 'Money Invested'},
]

export const activityInitialValues = {
  title: '',
  selectInvestor: '',
  fromDate: '',
  fromTime: '',
  toDate: '',
  toTime: '',
  guest: '',
  meetingLink: '',
  meetingNotes: '',
  exportToCalendar: '',
  timeZone: '',
  documentId: '',
}

export const activityTypeConst = [
  {id: 0, name: 'select activity type', value: '', disabled: true},
  {id: 1, name: 'email', value: 'email'},
  {id: 2, name: 'call', value: 'call'},
  {id: 3, name: 'meeting', value: 'meeting'},
  {id: 4, name: 'tasks', value: 'tasks'},
  {id: 5, name: 'notes', value: 'notes'},
  {id: 6, name: 'documents', value: 'documents'},
]

export const activityStatusConst = [
  {id: 7, name: 'select activity status', value: '', disabled: true},
  {id: 8, name: 'pending', value: 'pending'},
  {id: 9, name: 'ongoing', value: 'ongoing'},
  {id: 10, name: 'done', value: 'done'},
  {id: 11, name: 'cancelled', value: 'cancelled'},
]
export const sortActivityConst = [
  {id: 12, name: 'select sorting order', value: '', disabled: true},
  {id: 13, name: '(ASC) Title ', value: 'title-ASC'},
  {id: 14, name: '(DESC) Title ', value: 'title-DESC'},
]

export const sortInvestorCrmConst = [
  {id: 15, name: 'select sorting order', value: '', disabled: true},
  {id: 16, name: '(asc) fundsize ', value: 'fund_size-ASC'},
  {id: 17, name: '(desc) fundsize ', value: 'fund_size-DESC'},
  {id: 18, name: '(asc) name ', value: 'name-ASC'},
  {id: 19, name: '(desc) name ', value: 'name-DESC'},
]

export const activityTypeConst_ = [
  {id: 20, name: 'Email', value: 'email'},
  {id: 21, name: 'Call', value: 'call'},
  {id: 22, name: 'Meeting', value: 'meeting'},
  {id: 23, name: 'Tasks', value: 'tasks'},
  {id: 24, name: 'Notes', value: 'notes'},
  {id: 25, name: 'Documents', value: 'documents'},
]
