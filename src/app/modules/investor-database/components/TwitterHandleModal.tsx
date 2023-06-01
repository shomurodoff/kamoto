import React, {useState} from 'react'
import {Modal} from 'react-bootstrap'
import {Form, Formik} from 'formik'
import {useIntl} from 'react-intl'
import {CustomButton} from '../../widgets/components/UI/CustomButton'
import * as Yup from 'yup'
import TextInput from '../../widgets/components/Input/TextInput'
import {ToolTipUI} from '../../widgets/components/UI/ToolTipUI'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {toast} from 'react-toastify'
import {updateInvestor} from '../core/_requests'
import {useParams} from 'react-router-dom'

const TwitterHandleModal = ({setTwitterHandleModalShow, twitterHandleModalShow,singleInvestor,individualInvestor}: any) => {
  const {formatMessage} = useIntl()
  const [loading, setLoading] = useState(false)
  const {id} = useParams()
  const initialValues = {
    twitter_url: '',
  }
  const userSchema = Yup.object().shape({
    twitter_url: Yup.string()
      .url(formatMessage({id: formatMessage({id: 'Please Enter the valid URL'})}))
      .nullable(),
  })

  const onSubmit = async (values: any) => {
    if (id) {
      try {
        setLoading(true)
        const {
          data: {errors, success},
        } = await updateInvestor(+id, values)
        if (success) {
          await singleInvestor()
          toast.success(formatMessage({id: 'Twitter URL updated successfully'}))
          setLoading(false)
          setTwitterHandleModalShow(false)
        } else {
          setLoading(false)
          errors.forEach((error: string) => {
            toast.error(formatMessage({id: error}))
          })
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  return (
    <div>
      <Modal
        size='lg'
        show={twitterHandleModalShow}
        onHide={() => {
          setTwitterHandleModalShow(false)
        }}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <h2>{formatMessage({id: 'Update Twitter Handle'})}</h2>
        </Modal.Header>
        <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={onSubmit}>
          {(formik) => {
           formik.initialValues.twitter_url=individualInvestor?.twitter_url
            return (
              <Form>
                <Modal.Body>
                  <h4 className='font-weight-500 font-size-16'>
                    {formatMessage({id: 'Enter Full URL'})}
                  </h4>
                  <div className='d-flex align-items-center'>
                    <div className='mt-0 pt-0 m-8 d-flex gap-3 ms-0'>
                      <img
                        src={toAbsoluteUrl(`/media/icons/duotune/social/twitter.svg`)}
                        width='20px'
                        height='20px'
                        alt='twitter'
                      />
                      <label className='text-dark text-capitalize font-size-13 form-label font-weight-400'>
                        {formatMessage({id: 'Twitter'})}
                      </label>
                      <ToolTipUI
                        tooltipText={formatMessage({
                          id: 'GLOBAL.TOOLTIP.TWITTER_HANDLE_MODAL.TWITTER',
                        })}
                      />
                    </div>
                    <TextInput
                      fieldType={'url'}
                      fieldName={'twitter_url'}
                      formik={formik}
                      placeholder={formatMessage({id: 'Enter twitter URL here'})}
                      width={6}
                      isTooltipNotRequired={true}
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer className='p-0'>
                  <button
                    type='button'
                    className='btn btn-light font-size-13 font-weight-400'
                    onClick={() => {
                      setTwitterHandleModalShow(false)
                      setLoading(false)
                    }}
                  >
                    {formatMessage({id: 'Cancel'})}
                  </button>
                  <CustomButton
                    isSubmitting={formik.isSubmitting}
                    isValid={formik.isValid}
                    buttonText={formatMessage({id: 'Update URL'})}
                    loading={loading}
                    widthLoading={2}
                    width={2}
                    margin={'me-5 mt-5'}
                  />
                </Modal.Footer>
              </Form>
            )
          }}
        </Formik>
      </Modal>
    </div>
  )
}

export default TwitterHandleModal
