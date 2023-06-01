import {Form, Formik} from 'formik'
import {useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {useIntl} from 'react-intl'
import * as Yup from 'yup'
import {DisplayImage} from '../../widgets/components/General/DisplayImage'
import {SelectInput} from '../../widgets/components/Input/SelectInput'
import {Link} from 'react-router-dom'
import {getAllColumnsFromRoundId} from '../core/_requests'
import {getAddToCRMData, getSingleInvestor} from '../../investor-database/core/_requests'
import {toast} from 'react-toastify'
import Select from 'react-select'
import {ToolTipUI} from '../../widgets/components/UI/ToolTipUI'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'

export const AddInvestorModal = ({
  addInvestorModalShow,
  setAddInvestorModalShow,
  allRounds,
  allInvestors,
  setGetAllColumns,
  activeRound,
  columnDetails,
  refreshActiveRound,
}: any) => {
  const [imgName, setimgName] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)
  const [dynamicRoundOptions, setDynamicRoundOptions] = useState<any>()
  const [selectedRoundId, setSelectedRoundId] = useState<number | null>()
  const [selectedinvestorId, setSelectedinvestorId] = useState<number | null>(null)
  const [dynamicColumnsFromRoundOptions, setDynamicColumnsFromRoundOptions] = useState<any>()
  const [dynamicInvestorsOptions, setDynamicInvestorsOptions] = useState<any>()
  const {formatMessage} = useIntl()
  const [, setColumnId] = useState<number | null>()
  const initialValues = {
    investorId: null,
    roundId: activeRound,
    columnId: columnDetails ? columnDetails.columnId : null,
  }

  const addInvestorSchema = Yup.object().shape({
    investorId: Yup.string()
      .required(formatMessage({id: 'Investor Name is required'}))
      .nullable(),
    roundId: Yup.string()
      .required(formatMessage({id: 'Round Name is required'}))
      .nullable(),
    columnId: Yup.string().nullable(),
  })
  useEffect(() => {
    // using this to get Img for User
    const getSingleInvestordata = async () => {
      if (!!selectedinvestorId) {
        const {
          data: {data: values, success},
        } = await getSingleInvestor(selectedinvestorId)
        if (success) {
          if (values.fileId !== null) {
            setimgName(values.file?.name)
          } else {
            setimgName(undefined)
          }
        }
      }
    }
    getSingleInvestordata()
  }, [selectedinvestorId])
  const onSubmit = async (values: any) => {
    try {
      setLoading(true)
      values.investorId = +values.investorId
      values.roundId = +values.roundId
      values.isFavourite = false
      if (values.columnId !== undefined) {
        values.columnId = +values.columnId
      }
      const {
        data: {success, errors},
      } = await getAddToCRMData(values)
      if (success) {
        refreshActiveRound()
        setLoading(false)
        toast.success(formatMessage({id: 'Investor Added successfully'}))
        const {
          data: {success, data: allColumns},
        } = await getAllColumnsFromRoundId(selectedRoundId!)
        if (success) {
          setGetAllColumns(allColumns)
          setimgName(undefined)
          setAddInvestorModalShow(false)
        } else {
          setimgName(undefined)
        }
      } else if (errors) {
        setLoading(false)
        setimgName(undefined)
        errors.forEach((error: string) => {
          toast.error(formatMessage({id: error}))
        })
      }
    } catch (error) {
      setLoading(false)
      setimgName(undefined)
      console.log(error)
    }
  }

  useEffect(() => {
    if (allInvestors) {
      let investors: any = []
      investors = allInvestors.map((investor: any) => {
        return {
          id: investor.investorId,
          label: investor.name,
          value: investor.investorId,
        }
      })
      setDynamicInvestorsOptions(investors)
    }
    if (allRounds) {
      let rounds: any = []
      allRounds.map((round: any) => {
        return rounds.push({id: round.roundId, name: round.roundName, value: round.roundId})
      })
      setDynamicRoundOptions(rounds)
    }
  }, [dynamicRoundOptions, allRounds, allInvestors, activeRound, columnDetails])

  useEffect(() => {
    const getColumnsFromRoundIdApi = async () => {
      try {
        const {
          data: {success, data: allColumns},
        } = await getAllColumnsFromRoundId(selectedRoundId!)
        if (success) {
          let columns: any = []
          allColumns.forEach((column: any) => {
            if (column.status !== '0' && column.status !== '1') {
              columns.push({
                id: column.columnId,
                name: column.columnName,
                value: column.columnId,
              })
            }
          })
          setDynamicColumnsFromRoundOptions(columns)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (selectedRoundId) {
      getColumnsFromRoundIdApi()
    }
  }, [selectedRoundId])

  const DropdownIndicator = () => {
    return (
      <div className='me-3'>
        <img src={toAbsoluteUrl('/media/icons/investor/search.svg')} alt='search' />
      </div>
    )
  }

  const customStyles = {
    placeholder: (provided: any, state: any) => ({
      ...provided,
      fontSize: 13,
      fontWeight: 500,
    }),
    input: (provided: any, state: any) => ({
      ...provided,
      fontSize: 13,
    }),
  }
  return (
    <>
      <Modal
        size='lg'
        show={addInvestorModalShow}
        onHide={() => {
          setAddInvestorModalShow(false)
          setimgName(undefined)
        }}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Formik
          initialValues={initialValues}
          validationSchema={addInvestorSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            setSelectedRoundId(formik.values.roundId)
            setSelectedinvestorId(formik.values.investorId)
            setColumnId(formik.values.columnId)

            return (
              <Form>
                <Modal.Header closeButton>
                  <h2>{formatMessage({id: 'Add Investor'})}</h2>
                </Modal.Header>
                <Modal.Body className='mx-5'>
                  <div className=' mb-5 mt-0'>
                    <div>
                      <p className='font-size-16 text-muted mb-5'>
                        {formatMessage({
                          id: 'You can also add investors directly from our ',
                        })}{' '}
                        <span className='font-size-16'>
                          <Link className='fw-bold' to='/investor-database/create-investor'>
                            {formatMessage({id: 'Investor Database'})}
                          </Link>
                        </span>
                      </p>
                    </div>
                    <div className='d-flex flex-column flex-md-row col-12 justify-content-md-between'>
                      <div className='d-flex flex-column align-items-md-start align-items-center'>
                        <p className='font-size-13 mb-3'>{formatMessage({id: 'Logo'})}</p>
                        <div className='img_Card'>
                          <DisplayImage
                            imgName={imgName}
                            height='120px'
                            width='120px'
                            alt='profile'
                            className='shadow-sm'
                          />
                        </div>
                      </div>

                      <div className='col-md-7 col-12 mt-md-0 mt-6'>
                        {
                          <div className='highlight-multi-select font-size-12 text-bold mb-6 mt-0 w-md-100 searchable-select'>
                            <div className='d-flex'>
                              <p className='mb-1 font-size-13 form-label text-dark'>
                                {formatMessage({id: 'Investor Name'})}*{' '}
                              </p>
                              <ToolTipUI
                                tooltipText={formatMessage({
                                  id: 'GLOBAL.TOOLTIP.ADDINVESTORMODAL.INVESTOR_NAME',
                                })}
                              />
                            </div>
                            <Select
                              name={'investorId'}
                              value={dynamicInvestorsOptions?.find(
                                (option: any) => option.value === formik.values['investorId']
                              )}
                              onChange={(option) =>
                                formik.setFieldValue('investorId', option?.value)
                              }
                              onBlur={formik.handleBlur}
                              options={dynamicInvestorsOptions}
                              placeholder={formatMessage({id: 'Enter Investor or firm Name'})}
                              components={{DropdownIndicator}}
                              styles={customStyles}
                              isSearchable={true}
                              className='dark_text_color'
                              classNamePrefix='react-select'
                            />
                          </div>
                        }

                        {
                          <SelectInput
                            label={formatMessage({id: 'Round Name'})}
                            fieldName={'roundId'}
                            formik={formik}
                            placeholder={formatMessage({id: 'Select Round'})}
                            margin='me-0'
                            toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.PEOPLE.NAME'})}
                            options={dynamicRoundOptions}
                          />
                        }

                        {
                          <SelectInput
                            label={formatMessage({id: 'Column Name'})}
                            fieldName={'columnId'}
                            formik={formik}
                            placeholder={formatMessage({id: 'Enter Column Name'})}
                            margin='me-0'
                            toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.PEOPLE.NAME'})}
                            options={dynamicColumnsFromRoundOptions}
                          />
                        }
                      </div>
                    </div>
                  </div>
                  <div className='d-flex gap-3 m-5 w-100 justify-content-md-end'>
                    <button
                      className='btn btn-bg-light w-50 w-md-auto font-size-13'
                      onClick={() => {
                        setAddInvestorModalShow(false)
                        setimgName(undefined)
                      }}
                    >
                      {formatMessage({id: 'Cancel'})}
                    </button>
                    <button
                      className='btn btn-primary w-50 w-md-auto font-size-13 me-5'
                      disabled={loading}
                    >
                      {!loading && (
                        <span className='indicator-label font-size-13 p-0'>
                          {formatMessage({id: 'Add Investor'})}
                        </span>
                      )}
                      {loading && (
                        <span className='indicator-label font-size-13 p-0'>
                          {formatMessage({id: 'Please wait...'})}
                          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                      )}
                    </button>
                  </div>
                </Modal.Body>
              </Form>
            )
          }}
        </Formik>
      </Modal>
    </>
  )
}
