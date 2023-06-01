import {useIntl} from 'react-intl'
import * as Yup from 'yup'

export const useInitializeRoundSchema = () => {
  const {formatMessage} = useIntl()
  const intializeRoundSchema = Yup.object().shape({
    roundName: Yup.string()
      .min(3, formatMessage({id: 'Minimum 3 characters'}))
      .max(50, formatMessage({id: 'Maximum 50 characters'}))
      .required(formatMessage({id: 'Round Name is required'})),
    amountTargeted: Yup.number()
      .moreThan(-1, formatMessage({id: "Amount Targeted can't be negative"}))
      .required(formatMessage({id: 'Amount Targeted is required'}))
      .integer(formatMessage({id: 'Amount Targeted must be integer'})),

    roundType: Yup.string().required(formatMessage({id: 'Round Type is required'})),
    currency: Yup.string().required(formatMessage({id: 'Currency is required'})),
    amountAchieved: Yup.number()
      .moreThan(-1, formatMessage({id: "Amount Achieved can't be negative"}))
      .required(formatMessage({id: 'Amount Achieved is required'}))
      .integer(formatMessage({id: 'Amount Achieved must be integer'})),
  })

  const AddRoundSchema = Yup.object().shape({
    roundName: Yup.string()
      .min(3, formatMessage({id: 'Minimum 3 characters'}))
      .max(50, formatMessage({id: 'Maximum 50 characters'}))
      .required(formatMessage({id: 'Round Name is required'})),
    amountTargeted: Yup.number()
      .moreThan(-1, formatMessage({id: "Amount Targeted can't be negative"}))
      .required(formatMessage({id: 'Amount Targeted is required'}))
      .integer(formatMessage({id: 'Amount Targeted must be integer'})),

    roundType: Yup.string().required(formatMessage({id: 'Round Type is required'})),
    currency: Yup.number(),
    amountAchieved: Yup.number()
      .moreThan(-1, formatMessage({id: "Amount Achieved can't be negative"}))
      .required(formatMessage({id: 'Amount Achieved is required'}))
      .integer(formatMessage({id: 'Amount Achieved must be integer'})),
  })
  return {intializeRoundSchema, AddRoundSchema}
}
