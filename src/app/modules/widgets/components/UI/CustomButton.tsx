import React, {useState} from 'react'
import {useIntl} from 'react-intl'
import {ChangePasswordModal} from '../../../auth/components/ChangePasswordModal'

export const CustomButton = ({
  isSubmitting,
  isValid,
  isAcceptTerms,
  buttonText,
  loading,
  isAcceptTermsPresent,
  width,
  margin,
  buttonColor,
  show,
  handleClose,
  isModal,
  imgName,
  isSkipButton,
  widthLoading,
  height,
  marginButtom,
  onSubmit,

  onSkip,
}: {
  isSubmitting?: boolean
  isValid?: boolean
  isAcceptTerms?: boolean
  buttonText: string
  loading: boolean
  isAcceptTermsPresent?: boolean
  width?: number
  margin?: string
  buttonColor?: string
  show?: boolean
  handleClose?: () => void
  isModal?: boolean
  imgName?: string
  isSkipButton?: boolean
  widthLoading?: number
  height?: number
  marginButtom?: string
  onSubmit?: () => void
  onSkip?: () => void
}) => {
  const {formatMessage} = useIntl()
  const [showModal, setShowModal] = useState(false)

  return (
    <div
      className={`d-grid ${marginButtom ? marginButtom : 'mb-10'} ${margin ? margin : ''}
      }`}
    >
      {isModal ? (
        <button
          type='button'
          onClick={() => setShowModal(true)}
          className={`btn ${buttonColor ? buttonColor : 'btn-primary'} custom-button-property ${
            height ? `h-md-${height}px` : ''
          } `}
        >
          <span className='indicator-label'>{buttonText}</span>
        </button>
      ) : isSkipButton ? (
        <button
          type='button'
          onClick={async () => {
            if (onSkip) {
              await onSkip()
            }
          }}
          className={`btn ${buttonColor ? buttonColor : 'btn-primary'} custom-button-property ${
            height ? `h-md-${height}px` : ''
          }`}
        >
          <span className='indicator-label'>{buttonText}</span>
        </button>
      ) : (
        <button
          type='submit'
          onClick={onSubmit}
          className={`btn ${margin} ${
            buttonColor ? buttonColor : 'btn-primary'
          } custom-button-property ${height ? `h-md-${height}px` : ''}`}
          disabled={isSubmitting || !isValid || (!isAcceptTerms && isAcceptTermsPresent)}
        >
          {!loading && (
            <span className='text-[14px] font-medium leading-5 text-black'>{buttonText}</span>
          )}
          {loading && (
            <span className='indicator-label font-size-13 p-0'>
              {formatMessage({id: 'Please wait...'})}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      )}

      <ChangePasswordModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        setShowModal={setShowModal}
      />
    </div>
  )
}
