import React, { useState } from "react";
import { Modal, Dropdown } from "react-bootstrap";
import { useIntl } from "react-intl";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import {
  updateTransferOwnership,
  getUser,
  deleteUser,
  deletePendingInvite,
} from "../core/_requests";
import { useAuth } from "../../auth";
import { toast } from "react-toastify";
import UserModal from "./UserModal";
import { BasicButton } from "../../widgets/components/UI/BasicButton";
import { useDateFormat } from "../../../hooks/useDateFormat";
import { DateTime } from "luxon";
import { useTimeZone } from "../../../hooks/useTimeZone";
import { RolesName } from "../core/_constants";
import SearchInput from "./SearchInput";

export const Team = ({
  key,
  userList,
  pendingUserList,
  getUserList,
  getPendingUsers,
}: {
  key: number;
  userList: any;
  pendingUserList: any;
  getUserList: any;
  getPendingUsers: any;
}) => {
  const { formatMessage } = useIntl();
  const [showKebabMenu, setShowKebabMenu] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setDeleteShowModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const { personalityId } = useAuth();
  const [userId, setUserId] = useState<any>();
  const [editUserModal, setEditUserModal] = useState(false);
  const [showUserId, setShowUserId] = useState<any>();
  const [userDetails, setUserDetails] = useState<any>();
  const [flag, setFlag] = useState(false);
  const [transferOwnershipRadio, setTransferOwnershipRadio] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deletePendingLoading, setDeletePendingLoading] = useState(false);
  const [getUserApiSpinner, setUserApiSpinner] = useState(false);
  const { getDateValue } = useDateFormat();
  const { getTimeZoneValue } = useTimeZone();
  const [showDeletePendingInvites, setShowPendingInvites] = useState(false);
  const [selectedInviteId, setSelectedInviteId] = useState<any>();

  const UpdateTransferOwnership = async () => {
    try {
      const {
        data: { success, errors },
      } = await updateTransferOwnership(personalityId, userId);

      if (success) {
        toast.success(formatMessage({ id: "Transfer Ownership updated" }));
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const DeleteUser = async () => {
    try {
      setDeleteLoading(true);
      const {
        data: { success, errors },
      } = await deleteUser(personalityId, showUserId);
      if (success) {
        toast.success(formatMessage({ id: "User Deleted" }));
        getUserList();
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(false);
      setDeleteShowModal(!showDeleteModal);
    }
  };

  const deleteInvite = async (inviteId: number) => {
    try {
      setDeletePendingLoading(true);
      const {
        data: { success, errors },
      } = await deletePendingInvite(inviteId);
      if (success) {
        toast.success(formatMessage({ id: "Invite Deleted" }));
        getPendingUsers();
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setDeletePendingLoading(false);
      setShowPendingInvites(false);
    }
  };

  const getUserData = async () => {
    try {
      setUserApiSpinner(true);
      const {
        data: { success, data, errors },
      } = await getUser(personalityId, showUserId);
      if (success) {
        setUserDetails(data);
        setUserApiSpinner(false);
      } else {
        setUserApiSpinner(false);
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    } catch (err) {
      setUserApiSpinner(false);
      console.log(err);
    }
  };

  return (
    <>
      <SearchInput />
      <div className="bg-[#171825] md:px-[50px] px-[16px] py-[16px] md:pb-[40px] shadow-default rounded">
        <div className="card-body">
          <div className="row d-flex">
            <div className="col-md-6 col-12">
              <h4 className="text-[16px] leading-[22px] text-[#FFFFFFCC] font-medium  mb-[4px] md:mb-[8px]">
                {formatMessage({ id: "User & Roles" })}
              </h4>
              <p className="text-[14px] leading-5 text-[#FFFFFFA6] font-normal">
                {formatMessage({ id: "Roles of registered Users" })}
              </p>
            </div>
            <div className="col-12 d-md-flex flex-md-row justify-content-end col-md-6">
              <div className="row mt-3">
                <div className="col-12">
                  <button
                    className="btn btn-primary font-size-13 custom-button"
                    onClick={() => {
                      setAddModal(true);
                      setFlag(false);
                    }}
                  >
                    {formatMessage({ id: "Add New User" })}
                  </button>
                  <UserModal
                    title={formatMessage({ id: "Add New User" })}
                    buttonText={formatMessage({ id: "Add User" })}
                    addModal={addModal}
                    setAddModal={setAddModal}
                    flag={flag}
                    getUserList={getUserList}
                    getPendingUsers={getPendingUsers}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="table table-responsive custom-table mt-4">
                <table className="w-100">
                  <thead>
                    <tr className="custom-thead font-size-12 font-weight-400">
                      <td className="pb-4">{formatMessage({ id: "Name" })}</td>
                      <td className="pb-4">{formatMessage({ id: "Role" })}</td>
                      <td className="pb-4">
                        {formatMessage({ id: "Email Address" })}
                      </td>
                      <td className="pb-4">
                        <div className="d-flex gap-2">
                          <p>
                            {formatMessage({ id: "Last Modification Date" })}
                          </p>
                          <img
                            src={toAbsoluteUrl(
                              "/media/icons/profile/down_arrow.svg"
                            )}
                            alt=""
                            width={10}
                            className="mt-2"
                            height={7}
                          />
                        </div>
                      </td>
                      <td className="text-center pb-4">
                        {formatMessage({ id: "Action" })}
                      </td>
                    </tr>
                  </thead>
                  <tbody className="font-size-13 font-weight-400">
                    {userList.map((user: any) =>
                      user.roleId.includes("owner") ? (
                        <>
                          <tr>
                            <td className="pt-4 min-w-175px">
                              {user.firstName} {user.lastName}
                            </td>
                            <td className=" min-w-175px">
                              {RolesName[user.roleId[0]]}
                            </td>
                            <td className=" min-w-250px">{user.email}</td>
                            <td className=" min-w-175px">
                              {user.updatedAt
                                ? getDateValue(user.updatedAt?.toString())
                                  ? getDateValue(user.updatedAt?.toString())
                                  : DateTime.fromISO(
                                      user.updatedAt?.toString()
                                    ).toLocaleString(DateTime.DATE_MED)
                                : "-"}{" "}
                              {user.updatedAt &&
                                getTimeZoneValue(user.updatedAt?.toString())}
                            </td>
                            <td
                              className="text-center text-primary cursor-pointer  min-w-175px"
                              onClick={() => setModalShow(!modalShow)}
                            >
                              {formatMessage({ id: "Transfer Ownership" })}
                            </td>
                          </tr>
                        </>
                      ) : (
                        ""
                      )
                    )}

                    {userList.map((user: any) =>
                      user.roleId.includes("owner") ? (
                        ""
                      ) : (
                        <>
                          <tr
                            key={user.userId}
                            onMouseLeave={() => setShowKebabMenu(false)}
                          >
                            <td className="min-w-175px">
                              <div>
                                {user.firstName} {user.lastName}
                              </div>
                            </td>
                            <td className="min-w-175px">
                              {user.roleId.length > 0
                                ? RolesName[user.roleId[0]]
                                : "-"}
                            </td>
                            <td className="min-w-250px">{user.email}</td>
                            <td className="min-w-175px">
                              {user.updatedAt
                                ? getDateValue(user.updatedAt?.toString())
                                  ? getDateValue(user.updatedAt?.toString())
                                  : DateTime.fromISO(
                                      user.updatedAt?.toString()
                                    ).toLocaleString(DateTime.DATE_MED)
                                : "-"}{" "}
                              {user.updatedAt &&
                                getTimeZoneValue(user.updatedAt?.toString())}
                            </td>
                            <td className="text-center p-0 min-w-175px">
                              <div className="w-100 d-flex justify-content-center position-relative">
                                <div id="remove-investor">
                                  <Dropdown.Toggle
                                    className="bi bi-three-dots-vertical  me-1 p-1 px-3 py-2 bg-light text-dark"
                                    onClick={() => {
                                      setShowKebabMenu(!showKebabMenu);
                                      setShowUserId(user.userId);
                                    }}
                                  ></Dropdown.Toggle>
                                </div>
                                {showKebabMenu && user.userId === showUserId && (
                                  <div className="card w-100px h-120px shadow rounded kebab-menu-dropdown cursor-pointer ms-auto">
                                    <div className="border-bottom border-gray-300 border-bottom-2 px-4 py-3 dropdown-items">
                                      <div
                                        className="m-0"
                                        onClick={() => {
                                          setEditUserModal(!editUserModal);
                                          setShowKebabMenu(true);
                                          getUserData();
                                          setFlag(true);
                                        }}
                                      >
                                        {formatMessage({ id: "Edit" })}
                                      </div>
                                    </div>
                                    <div className="border-bottom border-gray-300 border-bottom-2 px-4 py-3 dropdown-items">
                                      <div
                                        className="m-0"
                                        onClick={() => {
                                          setShowKebabMenu(!showKebabMenu);
                                          setDeleteShowModal(!showDeleteModal);
                                        }}
                                      >
                                        {formatMessage({ id: "Delete" })}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                          <UserModal
                            title={formatMessage({ id: "Edit User" })}
                            buttonText={formatMessage({ id: "Edit" })}
                            addModal={editUserModal}
                            setAddModal={setEditUserModal}
                            flag={flag}
                            userDetails={userDetails}
                            getUserList={getUserList}
                            getUserApiSpinner={getUserApiSpinner}
                          />
                        </>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header
              closeButton
              onClick={() => setTransferOwnershipRadio(false)}
            >
              <h2>{formatMessage({ id: "Transfer Ownership" })}</h2>
            </Modal.Header>
            <Modal.Body>
              <h6 className="mb-4 pb-2">
                {formatMessage({
                  id: "Select the user whom you want transfer ownership to",
                })}
              </h6>
              <table className="table transfer-ownership-table mb-0">
                <thead>
                  <tr className="border border-top-0 border-right-0 border-left-0 border-2">
                    <td className="p-0 m-0 pt-4">
                      <p className="ps-15 transfer-ownership-td">
                        {formatMessage({ id: "Name" })}
                      </p>
                    </td>
                    <td className="p-0 m-0 pt-4">
                      <p className="transfer-ownership-td">
                        {formatMessage({ id: "Email Address" })}
                      </p>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((user: any) =>
                    user.roleId.includes("owner") ? (
                      ""
                    ) : (
                      <tr className="border border-top-0 border-right-0 border-left-0 border-2">
                        <td className="p-0 m-0">
                          <div className="form-check form-check-inline pt-4 m-0">
                            <input
                              className="form-check-input radio-button"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio1"
                              value="option1"
                              onClick={() => {
                                setUserId(user.userId);
                                setTransferOwnershipRadio(true);
                              }}
                            />
                            <p className="ms-2">
                              {user.firstName} {user.lastName}
                            </p>
                          </div>
                        </td>
                        <td className="p-0 m-0">
                          <div className="pt-4 m-0">{user.email}</div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="btn !bg-[#C2D24B1A] text-[#C2D24B]"
                onClick={() => {
                  setModalShow(!modalShow);
                  setTransferOwnershipRadio(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!transferOwnershipRadio}
                onClick={() => {
                  setShowModal(!showModal);
                  setModalShow(!modalShow);
                }}
              >
                Transfer Ownership
              </button>
            </Modal.Footer>
          </Modal>
        </div>
        <div>
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <h2>{formatMessage({ id: "Transfer Ownership" })}</h2>
            </Modal.Header>
            <Modal.Body>
              <p>
                Please note that the transfer of ownership is a permanent action
                and cannot be undone. As a result, you will no longer have the
                authority to access functionalities or desing a new owner . Are
                you certain you wish to proceed with the transfer?
              </p>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="btn !bg-[#C2D24B1A] text-[#C2D24B]"
                onClick={() => {
                  setShowModal(!showModal);
                  setTransferOwnershipRadio(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  UpdateTransferOwnership();
                  setShowModal(!showModal);
                }}
              >
                Confirm & Transfer
              </button>
            </Modal.Footer>
          </Modal>
        </div>
        <div>
          <Modal
            show={showDeleteModal}
            onHide={() => setDeleteShowModal(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <h2>{formatMessage({ id: "Delete User" })}</h2>
            </Modal.Header>
            <Modal.Body>
              <p>
                {formatMessage({
                  id: "Please note that the delete user is a permanent action and cannot be undone. As a result,you will no longer have the user. Are you certain you wish to proceed with this",
                })}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <BasicButton
                height="44px"
                border="none"
                color="#F5F8FA"
                textColor="#7E8299"
                padding="12px 16px"
                onClick={() => {
                  setDeleteShowModal(!showDeleteModal);
                }}
                buttonText="Cancel"
                minWidth={56}
              />

              <BasicButton
                height="44px"
                border="1px solid #4776E6"
                color="#4776E6"
                textColor="white"
                padding="12px 24px"
                onClick={() => {
                  DeleteUser();
                }}
                buttonText="Confirm Delete"
                minWidth={56}
                loading={deleteLoading}
                disabled={deleteLoading}
              />
            </Modal.Footer>
          </Modal>
        </div>
        <div>
          <Modal
            show={showDeletePendingInvites}
            onHide={() => setShowPendingInvites(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <h2>{formatMessage({ id: "Delete Pending Invites" })}</h2>
            </Modal.Header>
            <Modal.Body>
              <p>
                {formatMessage({
                  id: "Please note that the delete invite is a permanent action and cannot be undone. As a result, the user will no longer be able to accept the invite. Are you certain you wish to proceed with this?",
                })}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <BasicButton
                height="44px"
                border="none"
                color="#F5F8FA"
                textColor="#7E8299"
                padding="12px 16px"
                onClick={() => {
                  setShowPendingInvites(false);
                }}
                buttonText="Cancel"
                minWidth={56}
              />

              <BasicButton
                height="44px"
                border="1px solid #4776E6"
                color="#4776E6"
                textColor="white"
                padding="12px 24px"
                buttonText="Confirm Delete"
                minWidth={56}
                loading={deletePendingLoading}
                disabled={deletePendingLoading}
                onClick={() => deleteInvite(selectedInviteId)}
              />
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};
