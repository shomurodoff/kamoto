import React from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";

export const ChangePasswordModal = ({
  show,
  handleClose,
  setShowModal,
}: {
  show: boolean;
  handleClose?: () => void;
  setShowModal: (show: boolean) => void;
}) => {
  const { formatMessage } = useIntl();
  return (
    <Modal
      id="kt_modal_create_app"
      tabIndex={-1}
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-md-480px"
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <div className="modal-body py-lg-10 px-lg-10 d-md-flex flex-md-column align-items-md-center">
        <div className="text-center mb-md-5 fw-bold fs-4">
          {formatMessage({ id: "SETTINGS.USER.CHANGE_PASSWORD.TEXT" })}
        </div>
        <button
          className="btn btn-primary !text-[#000]"
          onClick={() => setShowModal(false)}
        >
          {formatMessage({ id: "SETTINGS.USER.CHANGE_PASSWORD.BUTTON" })}
        </button>
      </div>
    </Modal>
  );
};
