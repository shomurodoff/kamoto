import React, {FC, useState} from 'react'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Formik, Form} from 'formik'
import {useIntl} from 'react-intl'
import {SelectInput} from '../../../widgets/components/Input/SelectInput'
import {recordOptions} from '../../core/_constants'
import {leftDummyData} from '../../core/_constants'
const initialValues = {
  companyName: '',
  industry: '',
  country: '',
  state: '',
}
const DuplicateHandling: FC = () => {
  const {formatMessage} = useIntl()
  const [selectedParagraph, setSelectedParagraph] = useState<HTMLElement | null>(null)
  const onSubmit = async (values: any) => {
    console.log(values)
  }

  const handleClick = (event: any) => {
    const selectedTag = event.target
    if (selectedParagraph) {
      selectedParagraph.style.backgroundColor = ''
      selectedParagraph.style.color = '#8898A6'
    }
    selectedTag.style.backgroundColor = '#4776E6'
    selectedTag.style.color = 'white'
    setSelectedParagraph(selectedTag)
  }
  return (
    <div className='w-100'>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => {
          return (
            <Form>
              <div className='font-size-12'>
                <SelectInput
                  label={formatMessage({id: 'Select how duplicate records should be handle'})}
                  fieldName={'records'}
                  placeholder={formatMessage({id: 'Select'})}
                  formik={formik}
                  // toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.COMPANY_DETAILS.INDUSTRY'})}
                  options={recordOptions}
                  isTooltipNotRequired={true}
                  margin='m-0'
                />
              </div>
              <div>
                <p className='font-weight-500 font-size-13'>
                  {formatMessage({id: 'Select the matching fields to find duplicate records'})}
                </p>
                <div className='d-flex flex-md-row flex-column justify-content-between mt-8'>
                  <div>
                    <p className='font-weight-500 font-size-13 mb-md-1 mb-3'>
                      {formatMessage({id: 'Available fields on CSV'})}
                    </p>
                    <div className='import-field-csv border overflow-scroll p-8 '>
                      {leftDummyData.map((e) => {
                        return (
                          <p
                            className='font-size-12 text-clr88 cursor-pointer p-2'
                            onClick={handleClick}
                          >
                            {e}
                          </p>
                        )
                      })}
                    </div>
                  </div>
                  <div className='d-flex flex-column align-items-center gap-5 justify-content-center'>
                    <img
                      src={toAbsoluteUrl('/media/icons/investor/right-thin-arrow.svg')}
                      alt='right arrow'
                      className='d-flex d-md-block d-none'
                    />
                    <img
                      src={toAbsoluteUrl('/media/icons/investor/left-thin-arrow.svg')}
                      alt='left arrow'
                      className='d-flex d-md-block d-none'
                    />
                  </div>
                  <div className='d-flex justify-content-center d-md-none d-block my-5 gap-5'>
                    <img
                      src={toAbsoluteUrl('/media/icons/investor/up-thin-arrow.svg')}
                      alt='up arrow'
                      className='d-flex d-md-none d-block'
                    />
                    <img
                      src={toAbsoluteUrl('/media/icons/investor/down-thin-arrow.svg')}
                      alt='down arrow'
                      className='d-flex d-md-none d-block'
                    />
                  </div>
                  <div>
                    <p className='font-weight-500 font-size-13 mb-md-1 mb-4'>
                      {formatMessage({id: 'Fields to be match on.'})}
                    </p>
                    <div className='import-field-csv border overflow-auto p-8'>
                      {leftDummyData.map((e) => {
                        return <p className='font-size-12 text-clr88 cursor-pointer p-2'>{e}</p>
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export {DuplicateHandling}
