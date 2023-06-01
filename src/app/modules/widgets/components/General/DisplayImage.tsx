import React from 'react'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {GET_FILE_URL} from '../../../onboarding/core/_requests'

export const DisplayImage = ({
  imgName,
  height,
  alt,
  width,
  fit,
  className,
}: {
  imgName: string | undefined
  height?: string | number
  alt: string | undefined
  width?: string | undefined | number
  className?: string
  fit?: 'fill' | 'cover' | 'contain'
}) => {
  return (
    <>
      {imgName ? (
        <img
          src={`${GET_FILE_URL}/${imgName}`}
          height={height}
          width={width}
          alt={alt}
          style={{objectFit: fit}}
          className={className}
        />
      ) : (
        <img
          src={toAbsoluteUrl('/media/icons/duotune/general/user1.svg')}
          width={width}
          height={height}
          alt={alt}
          style={{objectFit: fit}}
          className={className}
        />
      )}
    </>
  )
}
