import React from 'react'
import {useEffect, useRef, useState} from 'react'
import {Formik, Form, FormikValues} from 'formik'
import {StepperComponent} from '../../../../_metronic/assets/ts/components'
import {
  ICreateAccount,
  createAccountSchemas,
  inits,
} from '../../wizards/components/CreateAccountWizardHelper'
import {useIntl} from 'react-intl'
import {UploadCsvFile} from '../components/Steps/UploadCsvFile'
import {FieldMapping} from '../components/Steps/FieldMapping'
import {DuplicateHandling} from '../components/Steps/DuplicateHandling'

const ImportInvestors = () => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const [initValues] = useState<ICreateAccount>(inits)
  const {formatMessage} = useIntl()
  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
    setCurrentSchema(createAccountSchemas[stepper?.current?.currentStepIndex! + 1])
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }

    stepper.current.goPrev()

    setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex - 1])
  }

  const submitStep = (values: ICreateAccount, actions: FormikValues) => {
    if (!stepper.current) {
      return
    }

    setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex + 2])

    if (stepper.current.currentStepIndex !== stepper.current.totatStepsNumber) {
      stepper.current.goNext()
    } else {
      stepper.current.goto(1)
      actions.resetForm()
    }
  }

  useEffect(() => {
    if (!stepperRef.current) {
      return
    }

    loadStepper()
  }, [stepperRef])

  return (
    <div
      ref={stepperRef}
      className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid mx-5 font-size-13'
      id='kt_create_account_stepper'
    >
      <div className='card gap-5 w-100 px-6 px-lg-10 px-xxl-10 py-10'>
        <div className='d-flex flex-row gap-md-20 gap-10 w-100'>
          <div className='stepper-item current' data-kt-stepper-element='nav'>
            <div className='stepper-wrapper d-flex flex-md-row flex-column'>
              <div className='stepper-icon w-40px h-40px ms-md-0 ms-n8'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>{formatMessage({id: '1'})}</span>
              </div>
              <div className='stepper-label mt-md-0 mt-2 ms-md-0 ms-2 text-align-start'>
                <h3 className='stepper-title font-size-13'>{formatMessage({id: 'Step 1'})}</h3>

                <div className='stepper-desc fw-semibold font-size-12'>
                  {formatMessage({id: 'Upload CSV file'})}
                </div>
              </div>
            </div>
            <div className='stepper-line h-40px'></div>
          </div>

          <div className='stepper-item' data-kt-stepper-element='nav'>
            <div className='stepper-wrapper d-flex flex-md-row flex-column'>
              <div className='stepper-icon w-40px h-40px ms-md-0 ms-n10'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>{formatMessage({id: '2'})}</span>
              </div>
              <div className='stepper-label mt-md-0 mt-2 ms-md-0 ms-2'>
                <h3 className='font-size-13 stepper-title'>{formatMessage({id: 'Step 2'})}</h3>
                <div className='stepper-desc fw-semibold font-size-12'>
                  {formatMessage({id: 'Duplicate Handling'})}
                </div>
              </div>
            </div>
            <div className='stepper-line h-40px'></div>
          </div>

          <div className='stepper-item' data-kt-stepper-element='nav'>
            <div className='stepper-wrapper d-flex flex-md-row flex-column'>
              <div className='stepper-icon w-40px h-40px ms-md-0 ms-n5'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>{formatMessage({id: '3'})}</span>
              </div>
              <div className='stepper-label mt-md-0 mt-2 ms-md-0 ms-2'>
                <h3 className='font-size-13 stepper-title'>{formatMessage({id: 'Step 3'})}</h3>
                <div className='stepper-desc fw-semibold font-size-12'>
                  {formatMessage({id: 'Field Mapping'})}
                </div>
              </div>
            </div>
            <div className='stepper-line h-40px'></div>
          </div>
        </div>
        <div className='d-flex flex-row-fluid bg-body rounded'>
          <Formik validationSchema={currentSchema} initialValues={initValues} onSubmit={submitStep}>
            {(formik) => (
              <Form className='py-2 w-100 px-3' noValidate id='kt_create_account_form'>
                <div className='current' data-kt-stepper-element='content'>
                  <UploadCsvFile />
                </div>

                <div data-kt-stepper-element='content'>
                  <DuplicateHandling />
                </div>

                <div data-kt-stepper-element='content'>
                  <FieldMapping />
                </div>
                <div className='d-flex flex-stack pt-10'>
                  {/* <div className='mr-2'>
                    <button
                      onClick={prevStep}
                      type='button'
                      className='btn btn-lg btn-light-primary me-3'
                      data-kt-stepper-action='previous'
                    >
                      {formatMessage({id: 'Back'})}
                    </button>
                  </div> */}

                  <div className='d-flex gap-6 justify-content-end w-100'>
                    <button
                      onClick={prevStep}
                      type='button'
                      className='btn btn-lg btn-light-primary me-3 w-md-auto w-50 border font-size-13'
                      data-kt-stepper-action='previous'
                    >
                      {formatMessage({id: 'Back'})}
                    </button>
                    <button className='border border-primary btn text-primary w-md-auto w-50 font-size-13'>
                      {formatMessage({id: 'Skip this step'})}
                    </button>
                    <button type='submit' className='btn btn-lg btn-primary me-3 w-md-auto w-50 border font-size-13'>
                      <span className='indicator-label'>
                        {stepper.current?.currentStepIndex !== stepper.current?.totatStepsNumber! &&
                          'Next'}
                        {stepper.current?.currentStepIndex === stepper.current?.totatStepsNumber! &&
                          'Import'}
                      </span>
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default ImportInvestors
