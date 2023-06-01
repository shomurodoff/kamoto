import React from 'react'
import {ToolTipUI} from '../UI/ToolTipUI'
import clsx from 'clsx'
import {ErrorMessage, Field} from 'formik'

const TextArea = ({
  fieldName,
  label,
  margin,
  width,
  toolTipText,
  formik,
  placeholder,
  isTooltipNotRequired,
  isStarRequired,
}: {
  fieldName: string
  label: string
  margin?: string
  width?: number
  toolTipText: string
  formik: any
  placeholder: string
  isTooltipNotRequired?: boolean
  isStarRequired?: boolean
}) => {
  return (
    <div className={`fv-row mb-8 ${margin} ${width ? `col-md-${width}` : ''}`}>
      <div className='d-flex justify-content-between'>
        <label
          className={` form-label font-size-13 text-dark text-capitalize`}
          htmlFor='kt_login_toc_agree'
        >
          {isStarRequired ? (
            !isTooltipNotRequired ? (
              <>
                {label}* <ToolTipUI tooltipText={toolTipText} />
              </>
            ) : (
              <>{label}*</>
            )
          ) : !isTooltipNotRequired ? (
            <>
              {label} <ToolTipUI tooltipText={toolTipText} />
            </>
          ) : (
            <>{label}</>
          )}
        </label>
      </div>
      <div className='position-relative'>
        <Field
          // id='t_login_toc_agree'
          className={clsx(
            'form-control font-size-12',
            {'is-invalid-local': formik.touched[fieldName] && formik.errors[fieldName]},
            {
              'is-valid-local': formik.touched[fieldName] && !formik.errors[fieldName],
            }
          )}
          aria-describedby='basic-addon2'
          as={'textarea'}
          rows={5}
          name={fieldName}
          placeholder={placeholder}
          autoComplete='off'
        />
      </div>
      <div className='text-danger mt-2'>
        <ErrorMessage name={fieldName} />
      </div>
    </div>
  )
}

export default TextArea
