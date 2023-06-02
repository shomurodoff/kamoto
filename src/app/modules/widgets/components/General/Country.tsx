import React, {useEffect, useState} from 'react'
import {getCountry, getLocation} from '../../../onboarding/core/_requests'
import {CountryModel} from '../../../onboarding'
import {SelectInput} from '../Input/SelectInput'
import {useIntl} from 'react-intl'

export const Country = ({
  initialValues,
  formik,
  label,
  setCountryId,
  tooltipText,
  width,
  isStarRequired,
}: {
  initialValues: any
  formik: any
  label: string
  setCountryId: (countryId: string) => void
  tooltipText: string
  width?: number
  isStarRequired?: boolean
}) => {
  const [countryOptions, setcountryOptions] = useState<any[]>([])
  const {formatMessage} = useIntl()
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const [
          ipStackData,
          {
            data: {data: countries},
          },
        ] = await Promise.all([getLocation(), getCountry()])
        const countriesData = countries.map((country: CountryModel) => {
          return {
            id: country.countryId,
            name: country.country_name,
            value: country.countryId,
          }
        })
        setcountryOptions([...countriesData])
        const country = countries.find(
          (country: CountryModel) => country.country_code === ipStackData.data.country_code
        )
        if (country) {
          initialValues.country = country.countryId.toString()
          setCountryId(country.countryId)
        }
      } catch (err) {
        const {
          data: {data: countries},
        } = await getCountry()
        const countriesData = countries.map((country: CountryModel) => {
          return {
            id: country.countryId,
            name: country.country_name,
            value: country.countryId,
          }
        })
        setcountryOptions([...countriesData])
      }
    }
    fetchCountry()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SelectInput
      label={label}
      fieldName={'country'}
      placeholder={formatMessage({id: 'Select the Country'})}
      formik={formik}
      toolTipText={tooltipText}
      options={countryOptions}
      width={width}
      isStarRequired={true}
    />
  )
}
