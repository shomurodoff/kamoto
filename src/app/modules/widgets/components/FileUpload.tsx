import { DashboardModal } from "@uppy/react";
import { Uppy } from "@uppy/core";
import Transloadit from "@uppy/transloadit";
import XHRUpload from "@uppy/xhr-upload";
import ImageEditor from "@uppy/image-editor";

import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/image-editor/dist/style.css";
import "@uppy/image-editor/dist/style.css";
import { AuthModel, getAuth } from "../../auth";
import { useEffect, useMemo } from "react";
import { getUploadSign } from "../../auth/core/_requests";
import { toast } from "react-toastify";
import { useIntl } from "react-intl";
export const FileUpload = ({
  fileSize,
  maxFileNumber,
  allowType,
  metaData,
  modalStatus,
  handleClose,
  handleSuccess,
  resourceType
}: {
  fileSize: number;
  maxFileNumber: number;
  allowType: string[];
  metaData: {};
  modalStatus: boolean;
  handleClose: () => void;
  handleSuccess: (id: number, name: string) => void;
  resourceType?: string;
}) => {
  const { token } = (getAuth() as AuthModel) || {};
  if (!token) {
    getAuth();
  }
  const { formatMessage } = useIntl();
  const getAssemblyOptions = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      getUploadSign(resourceType).then((resp) => {
        let transloaditObject = resp.data.data
        resolve({
          params: {
            auth: { key: transloaditObject.transloaditKey, expires: transloaditObject.expires },
            steps: {
              ':original': {
                robot: '/upload/handle'
              },
              image_optimized: {
                use: ':original',
                robot: '/image/optimize',
                priority: 'compression-ratio'
              },
              exported: transloaditObject.s3PublicBucketObj,
            },
          },
          signature: transloaditObject.publicUploadSignature
        })
      }).catch((err) => {
        toast.error(formatMessage({id : 'Server error while uploading. Please try again later.'}))
        uppy.cancelAll()
        handleClose()
      })
    })
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
        uppy.info(
          `Please upload a square image for better compatibility`,
          "info",
          3000
        );
        return true;
      },
    })
      .use(ImageEditor, {
        id: "ImageEditor",
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

      .use(Transloadit, {
        getAssemblyOptions,
        waitForEncoding: true
      })
      .on('transloadit:complete', (assembly) => {
          console.log(assembly.results[':original'][0].ssl_url)
          handleClose();
          handleSuccess(5,assembly.results[':original'][0].ssl_url)
          //   setPhotoUrl(assembly.results[':original'][0].ssl_url)
      })
      .on('error', (err) => {
        console.log(err)
        toast.error(formatMessage({id : 'Server error while uploading. Please try again later.'}))
        uppy.cancelAll()
    })
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  

  useEffect(() => {
    return () => uppy.close({ reason: "unmount" });
  }, [uppy]);
  return (
    <DashboardModal
      uppy={uppy}
      closeModalOnClickOutside
      open={modalStatus}
      onRequestClose={handleClose}
      plugins={["ImageEditor"]}
    />
  );
};
