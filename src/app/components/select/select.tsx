import React from 'react'
import Select, {StylesConfig} from 'react-select'
import clsx from 'clsx'
import {ToolTipUI} from '../../modules/widgets/components/UI/ToolTipUI'
import {inspect} from 'util'

// @ts-ignore

const colourStyles: StylesConfig<ColourOption> = {
  control: (styles, {isFocused}) => ({
    ...styles,
    backgroundColor: '#2E2F45',
    borderWidth: '1px',
    borderColor: isFocused ? '#474761' : '#323248',
    boxShadow: 'none',
    color: '#FFFFFFCC',
  }),
  menu: (styles) => {
    return {
      ...styles,
      backgroundColor: '#2E2F45',
      color: '#FFFFFFCC',
    }
  },
  option: (styles, {data, isDisabled, isFocused, isSelected}) => {
    return {
      ...styles,
      color: isDisabled ? '#red' : isSelected ? 'white' : 'black',
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': {
        ...styles[':active'],
      },
    }
  },

  input: (styles) => ({...styles}),
  placeholder: (styles) => ({...styles}),
  singleValue: (styles, {data}) => ({...styles, color: 'background: #FFFFFFCC'}),
  multiValue: (styles) => {
    return {
      ...styles,
      alignItems: 'center',
      backgroundColor: '#171825',
      borderRadius: '40px',
      padding: '2px 10px',
      color: '#FFFFFFCC',
    }
  },
}
const CustomSelect: React.FC<any> = ({
  label = 'label',
  tooltipText = 'toolTipText',
  className,
  ...rest
}) => {
  return (
    <div className={'mb-[16px] md:mb-[24px]'}>
      <label className={'flex gap-2 items-center text-[13px] leading-5 text-[#FFFFFFA6] mb-1'}>
        {label}
        <ToolTipUI tooltipText={tooltipText} />
      </label>
      <Select
        {...rest}
        className={clsx(className, 'react-select')}
        styles={colourStyles}
        theme={(theme) => ({
          ...theme,

          colors: {
            ...theme.colors,

            primary25: '#C2D24B',
            primary: '#FFFFFF1A',
          },
        })}
      />
    </div>
  )
}

export default CustomSelect
