import {useIntl} from 'react-intl'

export const BasicButton = ({
  buttonText,
  height,
  loading,
  inverted,
  onClick,
  disabled,
  color,
  border,
  textColor,
  minWidth,
  padding,
  width,
  id,
  customClass,
  investorCard,
}: {
  buttonText?: string
  height?: string
  loading?: boolean
  inverted?: boolean
  onClick?: () => void
  disabled?: boolean
  color?: string
  border?: string
  textColor?: string
  minWidth?: number
  padding?: string
  width?: string
  id?: string
  customClass?: string
  investorCard?: boolean
}) => {
  const {formatMessage} = useIntl()
  return (
    <button
      id={id ? id : ''}
      type='button'
      className={`h-${height} ${loading ? 'opacity-50' : ''} 
      ${investorCard ? '' : `min-w-${minWidth ? `${minWidth}px` : '150px'} `}
      btn custom-button-property ${customClass} w-${width}`}
      style={{
        backgroundColor: color,
        border,
        padding,
        height: height,
      }}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {!loading && (
        <span
          className={`indicator-label font-size-13`}
          style={{
            color: textColor,
          }}
        >
          {buttonText}
        </span>
      )}
      {loading && (
        <span
          className={`indicator-label font-size-13 p-0 opacity-50`}
          style={{
            color: textColor,
          }}
        >
          {formatMessage({id: 'Please wait...'})}
          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
        </span>
      )}
    </button>
  )
}
