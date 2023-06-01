import {DashboardModal} from '@uppy/react'
import {Uppy} from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'
import ImageEditor from '@uppy/image-editor'

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/image-editor/dist/style.css'
import '@uppy/image-editor/dist/style.css'
import {AuthModel, getAuth} from '../../auth'
import {useEffect, useMemo} from 'react'
export const FileUpload = ({
  fileSize,
  maxFileNumber,
  allowType,
  metaData,
  modalStatus,
  handleClose,
  handleSuccess
}: {
  fileSize: number
  maxFileNumber: number
  allowType: string[]
  metaData: {}
  modalStatus: boolean
  handleClose: () => void
  handleSuccess: (id: number, name: string) => void
}) => {
  const {token} = (getAuth() as AuthModel) || {}
  if (!token) {
    getAuth()
  }
  const uppy = useMemo(() => {
    return new Uppy({
      autoProceed: false,
      debug: false,
      restrictions: {
        maxFileSize: fileSize,
        maxNumberOfFiles: maxFileNumber,
        allowedFileTypes: allowType,
      },
      meta: metaData,
      onBeforeFileAdded: (currentFile, files) => {
        uppy.info(`Please upload a square image for better compatibility`, 'info', 3000)
        return true
      },
    })
      .use(ImageEditor, {
        id: 'ImageEditor',
        cropperOptions: {
          viewMode: 1,
          background: false,
          autoCropArea: 1,
          responsive: true,
          initialAspectRatio: 1,
          croppedCanvasOptions: {},
        },
        actions: {
          revert: true,
          rotate: true,
          granularRotate: true,
          flip: true,
          zoomIn: true,
          zoomOut: true,
          cropSquare: true,
          cropWidescreen: false,
          cropWidescreenVertical: false,
        },
      })

      .use(XHRUpload, {
        endpoint: `${process.env.REACT_APP_BASE_API_URL}/file`,
        fieldName: 'file',
        formData: true,
        bundle: false,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .on('upload-success', (file, response) => {
        const {data, success} = response.body
        if (success) {
          handleClose()
          handleSuccess(data.fileId, data.name)
        }
      })
      .on('upload-error', (file, error, response) => {
        const httpBody = response?.body
        console.log(httpBody)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    return () => uppy.close({reason: 'unmount'})
  }, [uppy])
  return (
    <DashboardModal
      uppy={uppy}
      closeModalOnClickOutside
      open={modalStatus}
      onRequestClose={handleClose}
      plugins={['ImageEditor']}
    />
  )
}