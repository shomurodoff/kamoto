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
  defaultValue,
  className,
}: {
  fieldName: string
  className?: string
  label: string
  margin?: string
  width?: number
  toolTipText: string
  defaultValue?: string
  formik: any
  placeholder: string
  isTooltipNotRequired?: boolean
  isStarRequired?: boolean
}) => {
  return (
    <div className={`w-full mb-[16px] md:mb-[16px]  ${margin} ${width ? `col-md-${width}` : ''}`}>
      <div className='d-flex justify-content-between'>
        <label
          className={`text-[13px] leading-5 text-[#FFFFFFA6] mb-1`}
          htmlFor='kt_login_toc_agree'
        >
          {isStarRequired ? (
            !isTooltipNotRequired ? (
              <span className={'flex gap-1'}>
                {label}* <ToolTipUI tooltipText={toolTipText} />
              </span>
            ) : (
              <>{label}*</>
            )
          ) : !isTooltipNotRequired ? (
            <span className={'flex gap-1'}>
              {label} <ToolTipUI tooltipText={toolTipText} />
            </span>
          ) : (
            <>{label}</>
          )}
        </label>
      </div>
      <div className='position-relative'>
        <Field
          // id='t_login_toc_agree'
          className={clsx(
            'form-control !bg-[#2E2F45] border-[#FFFFFF1A] font-size-12',
            className,
            {'is-invalid-local': formik.touched[fieldName] && formik.errors[fieldName]},
            {
              'is-valid-local': formik.touched[fieldName] && !formik.errors[fieldName],
            }
          )}
          aria-describedby='basic-addon2'
          as={'textarea'}
          defaultValue={defaultValue}
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
