import {ErrorMessage, Field, getIn} from 'formik'
import {ToolTipUI} from '../UI/ToolTipUI'
import clsx from 'clsx'

export const SelectInput = ({
  fieldName,
  label,
  toolTipText,
  placeholder,
  formik,
  options,
  margin,
  isFieldArray,
  isTooltipNotRequired,
  width,
  isStarRequired,

  isSearchIcon,
  disabled,
}: {
  fieldName: string
  label?: string
  toolTipText?: string
  placeholder: string
  formik: any
  options: any
  margin?: string
  isFieldArray?: boolean
  isTooltipNotRequired?: boolean
  width?: number
  isStarRequired?: boolean
  isSearchIcon?: boolean
  disabled?: boolean
}) => {
  const FieldArrayErrorMessage = ({name}: any) => (
    <Field
      name={name}
      render={({form}: any) => {
        const error = getIn(form.errors, name)
        const touch = getIn(form.touched, name)

        return touch && error ? error : null
      }}
    />
  )

  return (
    <div className={`fv-row mb-7 ${margin && margin} ${width ? `col-md-${width}` : ''}`}>
      {label && (
        <label className='form-label font-size-13 text-dark text-capitalize ms-3 ms-md-0'>
          {!isTooltipNotRequired ? (
            <>
              {label}
              {!isStarRequired && '*'} <ToolTipUI tooltipText={toolTipText} />
            </>
          ) : (
            <>{label}</>
          )}
        </label>
      )}

      <Field
        as='select'
        name={fieldName}
        disabled={disabled}
        className={clsx(
          `${isSearchIcon && 'form-search-select'} form-select h-40px font-size-13`,
          {'is-invalid-local': formik.touched[fieldName] && formik.errors[fieldName]},
          {
            'is-valid-local': formik.touched[fieldName] && !formik.errors[fieldName],
          }
        )}
      >
        <option className='text-muted' hidden>
          {placeholder}
        </option>
        {options?.map(({name, id, value}: {name: string; id: number; value: string}) => (
          <option key={id} value={value}>
            {name}
          </option>
        ))}
      </Field>
      <div className='text-danger mt-2'>
        {isFieldArray ? (
          <FieldArrayErrorMessage name={fieldName} />
        ) : (
          <ErrorMessage name={fieldName} />
        )}
      </div>
    </div>
  )
}
