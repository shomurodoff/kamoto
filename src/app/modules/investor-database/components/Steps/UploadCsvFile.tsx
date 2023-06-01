/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useState} from 'react'
import {useIntl} from 'react-intl'
import {FileUpload} from '../../../widgets/components/FileUpload'
import {Formik} from 'formik'

const initialValues = {
  fullName: '',
  email: '',
  designation: '',
  linkedIn: '',
}
const onSubmit = async (values: any) => {
  console.log(values)
}

const UploadCsvFile: FC = () => {
  const {formatMessage} = useIntl()
  const [modelStatus, setModelStatus] = useState<boolean>(false)
  const [, setCsv] = useState<string>()

  const handleOpen = () => {
    setModelStatus(true)
  }
  const handleClose = () => {
    setModelStatus(false)
  }
  return (
    <div className='w-100'>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => {
          return (
            <div className='pb-10 pb-lg-15'>
              <div className='d-flex flex-md-column flex-row justify-content-between'>
                <p>{formatMessage({id: 'Import file'})}</p>
                <button className='btn btn-primary w-150px font-size-13 height-36 d-flex align-items-center justify-content-center' onClick={handleOpen}>
                  {formatMessage({id: 'Import Files'})}
                </button>
              </div>
              <FileUpload
                fileSize={10485760}
                maxFileNumber={1}
                allowType={['text/csv']}
                metaData={{module: 'profileimg', isProtected: true}}
                modalStatus={modelStatus}
                handleClose={handleClose}
                handleSuccess={(id: number, name: string) => {
                  setCsv(name)
                  // formik.setFieldValue('profileImageId', id)
                }}
              />
              <div className='py-6 d-flex flex-column gap-6 font-size-13 font-weight-400'>
                <div className='d-flex gap-8 justify-content-between justify-content-md-start'>
                  <p className='col-md-2 font-size-13 font-weight-400'>
                    {formatMessage({id: 'Has Header'})}
                  </p>
                  <input type='checkbox' />
                </div>
                <div className='d-flex gap-md-8 flex-md-row flex-column'>
                  <p className='col-md-2 font-weight-400'>
                    {formatMessage({id: 'Character Encoding'})}
                  </p>
                  <select name='' id='' className='p-4 rounded-1'>
                    <option value=''>UTF-8</option>
                    <option value=''>UTF-9</option>
                    <option value=''>UTF-10</option>
                  </select>
                </div>
                <div className='d-flex gap-md-8 flex-md-row flex-column'>
                  <p className='col-md-2 font-weight-400'>
                    {formatMessage({id: 'Character Encoding'})}
                  </p>
                  <div className='d-md-flex flex-row gap-md-18'>
                    <div className='d-flex gap-5 col-md-6 col-10'>
                      <div className='d-flex gap-1 align-items-center col-6'>
                        <input type='radio' id='comma' name='character_encoding' value='comma' />
                        <label htmlFor='comma' className='font-weight-400'>
                          {formatMessage({id: 'Comma'})}
                        </label>
                      </div>
                      <div className='d-flex gap-1 align-items-center col-6'>
                        <input
                          type='radio'
                          id='semicolon'
                          className='fs-4'
                          name='character_encoding'
                          value='semicolon'
                        />
                        <label htmlFor='semicolon' className='font-weight-400'>
                          {formatMessage({id: 'Semicolon'})}
                        </label>
                      </div>
                    </div>
                    <div className='d-flex gap-5 col-md-6 col-10'>
                      <div className='d-flex gap-1 align-items-center col-6'>
                        <input type='radio' id='pipe' name='character_encoding' value='pipe' />
                        <label htmlFor='pipe' className='font-weight-400'>
                          {formatMessage({id: 'Pipe'})}
                        </label>
                      </div>
                      <div className='d-flex gap-1 align-items-center col-6'>
                        <input type='radio' id='caret' name='character_encoding' value='caret' />
                        <label htmlFor='caret' className='font-weight-400'>
                          {formatMessage({id: 'Caret'})}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </Formik>
    </div>
  )
}

export {UploadCsvFile}
