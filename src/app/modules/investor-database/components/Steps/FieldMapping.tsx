import React, {FC} from 'react'
import {Field, Formik, Form} from 'formik'
import {useIntl} from 'react-intl'
import {importInvestorTable} from '../../core/_constants'
import {recordOptions} from "../../core/_constants"
const initialValues = {}
const FieldMapping: FC = () => {
  const {formatMessage} = useIntl()
  const onSubmit = (values: any) => {
    console.log(values)
  }


  return (
    <div className='w-100'>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => {
          return (
            <Form>
              <div>
                <div className='d-flex flex-md-row flex-column gap-0 align-items-center'>
                  <p className='col-md-2 col-12 mb-md-0 mb-2 font-weight-500 font-size-13'>{formatMessage({id: 'Use saved maps'})}</p>
                  <Field
                    as='select'
                    // name={fieldName}
                    className='form-select form-select-lg font-size-12 form-label'
                  >
                    {recordOptions.map(
                      ({name, id, value}: {name: string; id: number; value: string}) => (
                        <option key={id} value={value}>
                          {name}
                        </option>
                      )
                    )}
                  </Field>
                </div>
                <div className='mt-7 table-responsive'>
                  <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                    <thead>
                      <tr>
                        <th className='text-clr38 min-w-150px font-weight-500 fw-semibold font-size-13'>
                         {formatMessage({id:'Header'})} 
                        </th>
                        <th className='min-w-140px font-weight-500 fw-semibold font-size-13 text-clr38'>
                        {formatMessage({id:'CRM fields'})} 
                        </th>
                        <th className='min-w-120px font-weight-500 fw-semibold font-size-13 text-clr38'>
                        {formatMessage({id:'Default value'})} 
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {importInvestorTable.map((e) => (
                        <tr>
                          <td className='min-w-200px'>
                            <p className='text-hover-primary font-weight-400 font-size-13 text-clr38'>
                              {e.name}
                            </p>
                          </td>
                          <td className='min-w-200px'>
                            <p className=' text-hover-primary font-weight-400 font-size-13 text-clr38 mb-0'>
                              <Field
                                as='select'
                                // name={fieldName}
                                className='form-select form-select-lg font-size-13'
                              >
                                {recordOptions.map(
                                  ({
                                    name,
                                    id,
                                    value,
                                  }: {
                                    name: string
                                    id: number
                                    value: string
                                  }) => (
                                    <option key={id} value={value} className='font-size-13'>
                                      {name}
                                    </option>
                                  )
                                )}
                              </Field>
                            </p>
                          </td>
                          <td className='min-w-200px'>
                            <p className='text-hover-primary font-weight-400 font-size-13 text-clr38 border h-40px mb-0 rounded-1'>
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className='d-flex flex-md-row flex-column align-items-center gap-4 mt-10'>
                  <div className='d-flex align-items-center gap-3 text-left col-md-2 col-12'>
                  <input type="checkbox" className='h-20px w-20px bg-clrDB rounded-1' />
                  <div className='font-weight-400 font-size-12 text-clr58'>{formatMessage({id:'Save as Custom mapping'})}</div>
                  </div>
                  <input type="text" className='form-control w-md-25 w-100' />
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export {FieldMapping}
