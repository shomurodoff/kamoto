import React from 'react'
import {toast} from 'react-toastify'
import {useIntl} from 'react-intl'
import {ToolTipUI} from '../../widgets/components/UI/ToolTipUI'

export const BCCTracking = ({key, bccEmail}: {key: number; bccEmail: string}) => {
  const {formatMessage} = useIntl()

  return (
    <div className='card row'>
      <div className='card-body'>
        <div className='col-12 row'>
          <div className='col-lg-6 col-md-6 col-xl-6 col-12'>
            <div className='input-group  border-right-0'>
              <label className='col-12 mb-2'>
                {formatMessage({id: 'To track your sent emails put this email into BCC field:'})}{' '}
                <ToolTipUI tooltipText={'GLOBAL.TOOLTIP.BCCTRACKING'} />
              </label>
              <input
                type='text'
                className='form-control '
                value={bccEmail}
                placeholder='Some path'
                // id='copy-input'
              />
              <span
                className='input-group-btn border border-left-0'
                style={{borderColor: '#e4e6ef !important'}}
                onClick={() => {
                  navigator.clipboard.writeText(`${bccEmail}`)
                  toast.success(formatMessage({id: 'Copied Successfully'}))
                }}
              >
                <i className='fa fa-copy  btn'></i>
              </span>
            </div>
          </div>
          <div>
            <p className='pt-8'>
              {formatMessage({
                id: 'Please note that the email should be sent from the same email address as the one inserted in your user settings',
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
