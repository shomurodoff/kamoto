import { Formik } from "formik";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import TextInput from "../../widgets/components/Input/TextInput";
import { CustomButton } from "../../widgets/components/UI/CustomButton";
import * as Yup from "yup";
import { ToolTipUI } from "../../widgets/components/UI/ToolTipUI";
import { addUser, editUser } from "../core/_requests";
import { Roles } from "../core/_constants";
import { toast } from "react-toastify";
import { useAuth } from "../../auth";
import { Spinner } from "../../widgets/components/General/Spinner";
import { BasicButton } from "../../widgets/components/UI/BasicButton";

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  designation: "",
  roles: "",
};

const UserModal = ({
  title,
  buttonText,
  addModal,
  setAddModal,
  flag,
  userDetails,
  getUserList,
  getPendingUsers,
  getUserApiSpinner,
}: {
  title: string;
  buttonText: string;
  addModal: boolean;
  setAddModal: Dispatch<SetStateAction<boolean>>;
  flag: boolean;
  userDetails?: any;
  getUserList: any;
  getPendingUsers?: any;
  getUserApiSpinner?: boolean;
}) => {
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false);
  const { companyId } = useAuth();

  const userSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(1, formatMessage({ id: "Minimum 1 character is required" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Full name is required" }))
      .nullable(),
    lastname: Yup.string()
      .min(1, formatMessage({ id: "Minimum 1 character is required" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Last name is required" }))
      .nullable(),
    email: Yup.string()
      .email(formatMessage({ id: "Invalid email format" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Email is required" })),
    designation: Yup.string()
      .min(1, formatMessage({ id: "Minimum 1 character is required" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Last name is required" }))
      .nullable(),
    roles: Yup.string()
      .required(formatMessage({ id: "Role is required" }))
      .nullable(),
  });

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      if (!flag) {
        const payload = {
          companyId: companyId?.toString(),
          Users: [
            {
              firstName: values.firstname,
              lastName: values.lastname,
              email: values.email,
              designation: values.designation,
            },
          ],
        };
        const {
          data: { success, errors },
        } = await addUser(payload);
        if (success) {
          setLoading(false);
          setAddModal(!addModal);
          getPendingUsers();
          toast.success(formatMessage({ id: "User Invited" }));
        } else {
          setLoading(false);
          setAddModal(!addModal);
          errors.forEach((error: string) => {
            toast.error(formatMessage({ id: error }));
          });
        }
      } else {
        const payload = {
          companyId: companyId,
          firstName: values.firstname,
          lastName: values.lastname,
          email: values.email,
          designation: values.designation,
          roles: [values.roles],
        };

        const {
          data: { success, errors },
        } = await editUser(userDetails?.userId, payload);
        if (success) {
          setLoading(false);
          setAddModal(!addModal);
          toast.success(formatMessage({ id: "User Updated" }));
          getUserList();
        } else {
          setLoading(false);
          errors.forEach((error: string) => {
            toast.error(formatMessage({ id: error }));
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (flag) {
    initialValues.firstname = userDetails?.firstName;
    initialValues.lastname = userDetails?.lastName;
    initialValues.email = userDetails?.email;
    initialValues.designation = userDetails?.designation;
    initialValues.roles = userDetails?.userRoles[0].roleId;
  } else {
    initialValues.firstname = "";
    initialValues.lastname = "";
    initialValues.email = "";
    initialValues.designation = "";
    initialValues.roles = "";
  }
  return (
    <>
      <div>
        <Modal
          show={addModal}
          onHide={() => setAddModal(!addModal)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          {getUserApiSpinner ? <Spinner placement={true} /> : null}
          <Modal.Header closeButton>
            <div className={"flex justify-between items-center !w-full"}>
              <h2 className={"text-[20px] leading-[28px] font-semibold"}>
                {title}
              </h2>
              <button onClick={() => setAddModal(false)}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.2426 6.34359L6.34309 16.2431C5.95257 16.6336 5.95257 17.2668 6.34309 17.6573C6.73362 18.0478 7.36678 18.0478 7.75731 17.6573L17.6568 7.75781C18.0473 7.36728 18.0473 6.73412 17.6568 6.34359C17.2663 5.95307 16.6331 5.95307 16.2426 6.34359Z"
                    fill="#C2D24B"
                    fillOpacity="0.5"
                  />
                  <path
                    opacity="0.3"
                    d="M17.6569 16.2423L7.7574 6.34285C7.36688 5.95232 6.73371 5.95232 6.34319 6.34285C5.95266 6.73337 5.95266 7.36654 6.34319 7.75706L16.2427 17.6566C16.6332 18.0471 17.2664 18.0471 17.6569 17.6566C18.0474 17.266 18.0474 16.6329 17.6569 16.2423Z"
                    fill="#C2D24B"
                    fillOpacity="0.5"
                  />
                </svg>
              </button>
            </div>
          </Modal.Header>
          <Formik
            initialValues={initialValues}
            validationSchema={userSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <Modal.Body>
                    <TextInput
                      fieldType={"text"}
                      fieldName={"email"}
                      formik={formik}
                      placeholder={formatMessage({ id: "Enter email" })}
                      label={formatMessage({ id: "Email Address" })}
                      isTooltipNotRequired={true}
                    />
                    <div className="col-12 mb-4">
                      <label className="text-[13px] leading-[18px] text-[#FFFFFFA6] font-medium flex items-center">
                        {formatMessage({ id: "Assign Role" })}
                        <ToolTipUI
                          tooltipText={formatMessage({ id: "Assign Role" })}
                        />
                      </label>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <TextInput
                          fieldName={"fullAccess"}
                          formik={formik}
                          customText={formatMessage({ id: "Full Access" })}
                          placeholder=""
                          fieldType={"checkbox"}
                          isCheckbox={true}
                          isStarRequired={true}
                        />
                      </div>
                      <div className="col-6">
                        <TextInput
                          fieldName={"importFiles"}
                          formik={formik}
                          customText={formatMessage({ id: "Import Files" })}
                          placeholder=""
                          fieldType={"checkbox"}
                          isCheckbox={true}
                          isStarRequired={true}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <TextInput
                          fieldName={"accountsAccess"}
                          formik={formik}
                          customText={formatMessage({ id: "Accounts access" })}
                          placeholder=""
                          fieldType={"checkbox"}
                          isCheckbox={true}
                          isStarRequired={true}
                        />
                      </div>
                      <div className="col-6">
                        <TextInput
                          fieldName={"manageData"}
                          formik={formik}
                          customText={formatMessage({ id: "Manage data" })}
                          placeholder=""
                          fieldType={"checkbox"}
                          isCheckbox={true}
                          isStarRequired={true}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <TextInput
                          fieldName={"addUsers"}
                          formik={formik}
                          customText={formatMessage({ id: "Add users" })}
                          placeholder=""
                          fieldType={"checkbox"}
                          isCheckbox={true}
                          isStarRequired={true}
                        />
                      </div>
                      <div className="col-6">
                        <TextInput
                          fieldName={"dataRoomAccess"}
                          formik={formik}
                          customText={formatMessage({ id: "Data Room access" })}
                          placeholder=""
                          fieldType={"checkbox"}
                          isCheckbox={true}
                          isStarRequired={true}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <TextInput
                          fieldName={"sell"}
                          formik={formik}
                          customText={formatMessage({ id: "Sell" })}
                          placeholder=""
                          fieldType={"checkbox"}
                          isCheckbox={true}
                          isStarRequired={true}
                        />
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <div className="d-flex flex-wrap gap-3">
                      <BasicButton
                        buttonText={formatMessage({ id: "Discard" })}
                        border="none"
                        color="#C2D24B1A"
                        textColor="#C2D24B"
                        customClass={"px-[24px]"}
                        height="42px"
                        onClick={() => formik.resetForm()}
                      />
                      <CustomButton
                        isSubmitting={formik.isSubmitting}
                        isValid={formik.isValid}
                        buttonText={buttonText}
                        loading={loading}
                        height={44}
                        widthLoading={1}
                        width={1}
                        onSubmit={formik.handleSubmit}
                      />
                    </div>
                  </Modal.Footer>
                </Form>
              );
            }}
          </Formik>
        </Modal>
      </div>
    </>
  );
};

export default UserModal;
