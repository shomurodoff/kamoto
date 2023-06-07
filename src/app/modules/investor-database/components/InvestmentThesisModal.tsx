import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { CustomButton } from "../../widgets/components/UI/CustomButton";
import { useIntl } from "react-intl";
import { Form, Formik } from "formik";
import TextArea from "../../widgets/components/Input/TextArea";
import TextInput from "../../widgets/components/Input/TextInput";
import { ToolTipUI } from "../../widgets/components/UI/ToolTipUI";
import Select from "react-select";
import {
  getFocusArea,
  getInvestorGeography,
  getStageFocus,
  updateInvestor,
} from "../core/_requests";
import { toast } from "react-toastify";
import * as Yup from "yup";

// @ts-ignore
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { useParams } from "react-router-dom";
const InvestmentThesisModal = ({
  investmentThesisModalShow,
  setInvestmentThesisModalShow,
  individualInvestor,
  singleInvestor,
}: any) => {
  const { formatMessage } = useIntl();
  const [stageFocus, setStageFocus] = useState<any>([]);
  const [stageFocusData, setStageFocusData] = useState<any>([]);
  const [focusArea, setFocusArea] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [investorGeography, setInvestorGeography] = useState<any>([]);
  const [investorGeographyData, setInvestorGeographyData] = useState<any>([]);
  const [sliderValue, setSliderValue] = useState<any>();
  const { id } = useParams();
  const [initialStageFocus, setInitialStageFocus] = useState<any>();
  const [initialFocusArea, setInitialFocusArea] = useState<any>([]);
  const [initialInvestorGeography, setInitialInvestorGeography] =
    useState<any>();
  const [investorFocusArea, setInvestorFocusArea] = useState<any>([]);

  const initialValues: any = {
    minInvestmentRange: "",
    maxInvestmentRange: "",
    fundingRequirement: "",
  };
  const userSchema = Yup.object().shape({
    minInvestmentRange: Yup.number().nullable(),
    maxInvestmentRange: Yup.number().nullable(),
    fundingRequirement: Yup.string().nullable(),
  });

  useEffect(() => {
    if (individualInvestor) {
      setInitialStageFocus(
        individualInvestor?.stageFocuses?.map((e: any) => {
          return { value: e.investorStageFocusId, label: e.name };
        })
      );
      setInitialFocusArea(
        individualInvestor?.investorFocusAreas?.map((e: any) => {
          return { value: e.investorFocusAreaId, label: e.name };
        })
      );
      setInitialInvestorGeography(
        individualInvestor?.investorGeographies?.map((e: any) => {
          return { value: e.investorGeographyId, label: e.name };
        })
      );
    }
  }, [individualInvestor]); // eslint-disable-line react-hooks/exhaustive-deps
  const getAllStageFocus = async () => {
    try {
      const {
        data: { data, success, errors },
      } = await getStageFocus();
      if (success) {
        let stageFocusData = data.map((e: any) => {
          return { value: e.investorStageFocusId, label: e.name };
        });
        setStageFocus(stageFocusData);
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllStageFocus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getAllInvestorGeography = async () => {
    try {
      const {
        data: { data, success, errors },
      } = await getInvestorGeography();
      if (success) {
        let investorGeographyData = data.map((e: any) => {
          return { value: e.investorGeographyId, label: e.name };
        });
        setInvestorGeography(investorGeographyData);
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllInvestorGeography();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getAllFocusArea = async () => {
    try {
      const {
        data: { data, success, errors },
      } = await getFocusArea();
      if (success) {
        let investorFocusAreaData = data.map((e: any) => {
          return { value: e.investorFocusAreaId, label: e.name };
        });
        setInvestorFocusArea(investorFocusAreaData);
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllFocusArea();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (values: any) => {
    let focus_area = focusArea.map((e: any) => e.value);
    let stage_focus = stageFocusData.map((e: any) => e.value);
    let investor_geography = investorGeographyData.map((e: any) => e.value);
    if (id) {
      try {
        setLoading(true);
        if (values.minInvestmentRange === "") {
          values.minInvestmentRange = "0";
        }
        if (values.maxInvestmentRange === "") {
          values.maxInvestmentRange = "0";
        }
        const investmentRange = `${values.minInvestmentRange}-${values.maxInvestmentRange}`;
        const payload = {
          investment_range: investmentRange,
          funding_requirement: values.fundingRequirement,
          focus_area: focus_area,
          stage_focus: stage_focus,
          investor_geography: investor_geography,
          sweet_spot: sliderValue && JSON.stringify(sliderValue),
        };
        const {
          data: { success, errors },
        } = await updateInvestor(+id, payload);
        if (success) {
          await singleInvestor();
          toast.success(
            formatMessage({ id: "Investments updated successfully" })
          );
          setInvestmentThesisModalShow(false);
          setLoading(false);
        } else {
          setLoading(false);
          errors.forEach((error: string) => {
            toast.error(formatMessage({ id: error }));
          });
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
  };
  const handleChange = async (values: any) => {
    setSliderValue(values);
  };

  const handleChangeFocusArea = (selectedOptions: any) => {
    setInitialFocusArea(selectedOptions);
    setFocusArea(selectedOptions);
  };

  const handleChangeInvestorGeography = (selectedOptions: any) => {
    setInitialInvestorGeography(selectedOptions);
    setInvestorGeographyData(selectedOptions);
  };
  const handleChangeStageFocus = (selectedOptions: any) => {
    setInitialStageFocus(selectedOptions);
    setStageFocusData(selectedOptions);
  };
  return (
    <div>
      <Modal
        size="lg"
        show={investmentThesisModalShow}
        onHide={() => {
          setInvestmentThesisModalShow(false);
        }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>{formatMessage({ id: "Investment Thesis" })}</h2>
        </Modal.Header>
        <Formik
          initialValues={initialValues}
          validationSchema={userSchema}
          onSubmit={onSubmit}
        >
          {(formik: any) => {
            if (individualInvestor?.investment_range) {
              formik.initialValues.minInvestmentRange =
                individualInvestor?.investment_range.split("-")[0];
              formik.initialValues.maxInvestmentRange =
                individualInvestor?.investment_range.split("-")[1];
            }
            individualInvestor?.funding_requirement &&
              (formik.initialValues.fundingRequirement =
                individualInvestor?.funding_requirement);
            return (
              <Form>
                <Modal.Body>
                  <div className="d-md-flex col-md-12 flex-wrap w-100 m-auto justify-content-center">
                    <div className="w-100">
                      <TextArea
                        fieldName={"fundingRequirement"}
                        formik={formik}
                        placeholder={formatMessage({
                          id: "Enter funding requirements",
                        })}
                        label={formatMessage({ id: "Funding Requirement" })}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.INVESTMENT_THESIS_MODAL.TEXT_AREA",
                        })}
                      />
                    </div>
                    <div className="w-100 row d-md-flex justify-content-between">
                      <div className="col-md-6 multi-select w-100 investor_type">
                        <label className="bold text-dark text-capitalize font-size-13 form-label">
                          {formatMessage({ id: "Stage Focus" })}
                        </label>
                        <ToolTipUI
                          tooltipText={formatMessage({
                            id: "GLOBAL.TOOLTIP.INVESTMENT_THESIS_MODAL.STAGE_FOCUS",
                          })}
                        />
                        <div className="highlight-multi-select font-size-12 text-bold mobile-investorType">
                          <Select
                            isMulti
                            name="stage_focus"
                            options={stageFocus}
                            className="basic-multi-select mb-7 mb-md-0 custom-select"
                            onChange={handleChangeStageFocus}
                            placeholder={formatMessage({
                              id: "Choose Stage Focus",
                            })}
                            classNamePrefix="react-select"
                            value={initialStageFocus}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 d-flex align-items-center justify-content-center tablet-investment">
                        <div className="col-5">
                          <TextInput
                            fieldType={"number"}
                            label={formatMessage({ id: "Investment range" })}
                            fieldName={"minInvestmentRange"}
                            formik={formik}
                            placeholder={formatMessage({
                              id: "Enter min range",
                            })}
                            toolTipText={formatMessage({
                              id: "GLOBAL.TOOLTIP.INVESTMENT_THESIS_MODAL.INVESTMENT_RANGE",
                            })}
                            margin={"me-md-0"}
                          />
                        </div>
                        <p className="mt-10 mt-md-0 col-2 d-flex align-items-center justify-content-center">
                          -
                        </p>
                        <div className="col-5 mt-7 mt-md-0">
                          <TextInput
                            fieldType={"number"}
                            fieldName={"maxInvestmentRange"}
                            formik={formik}
                            placeholder={formatMessage({
                              id: "Enter max range",
                            })}
                            margin={"me-md-0 mt-6"}
                            isTooltipNotRequired={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-100 mb-10 ps-3">
                      <label className="form-label font-size-13 text-dark text-capitalize ms-3 ms-md-0 mb-4">
                        {formatMessage({ id: "Sweet Spot" })}
                        <ToolTipUI
                          tooltipText={formatMessage({
                            id: "GLOBAL.TOOLTIP.INVESTMENT_THESIS_MODAL.SWEET_SPOT",
                          })}
                        />
                      </label>
                      <div className="px-2">
                        <Slider
                          range
                          onChange={handleChange}
                          defaultValue={
                            individualInvestor.sweet_spot
                              ? [
                                  +JSON.parse(individualInvestor.sweet_spot)[0],
                                  +JSON.parse(individualInvestor.sweet_spot)[1],
                                ]
                              : [0, 1000000000]
                          }
                          min={0}
                          max={1000000000}
                        />
                      </div>
                    </div>
                    <div className="w-100 row d-md-flex justify-content-between">
                      <div className="col-md-6 multi-select w-100 investor_type target-sector">
                        <label className="bold text-dark text-capitalize font-size-13 form-label">
                          {formatMessage({ id: "Target Sector(s)" })}
                        </label>
                        <ToolTipUI
                          tooltipText={formatMessage({
                            id: "GLOBAL.TOOLTIP.INVESTMENT_THESIS_MODAL.TARGET_SECTOR",
                          })}
                        />
                        <div className=" highlight-multi-select font-size-12 text-bold mobile-investorType">
                          <Select
                            isMulti
                            name="focusArea"
                            options={investorFocusArea!}
                            className="basic-multi-select mb-7 mb-md-0 custom-select"
                            onChange={handleChangeFocusArea}
                            placeholder={formatMessage({
                              id: "Choose Target Sector",
                            })}
                            classNamePrefix="react-select"
                            value={initialFocusArea}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 multi-select w-100 investor_type target-geography">
                        <label className="bold text-dark text-capitalize font-size-13 form-label">
                          {formatMessage({ id: "Target Geography" })}
                        </label>
                        <ToolTipUI
                          tooltipText={formatMessage({
                            id: "GLOBAL.TOOLTIP.INVESTMENT_THESIS_MODAL.TARGET_GEOGRAPHY",
                          })}
                        />
                        <div className=" highlight-multi-select font-size-12 text-bold mobile-investorType">
                          <Select
                            isMulti
                            name="target_geography"
                            options={investorGeography}
                            className="basic-multi-select mb-7 mb-md-0 custom-select"
                            onChange={handleChangeInvestorGeography}
                            placeholder={formatMessage({
                              id: "Choose Target Geography",
                            })}
                            classNamePrefix="react-select"
                            value={initialInvestorGeography}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                  <button
                    type="button"
                    className="btn btn-light font-size-13 font-weight-400"
                    onClick={() => {
                      setInvestmentThesisModalShow(false);
                      setLoading(false);
                    }}
                  >
                    {formatMessage({ id: "Cancel" })}
                  </button>
                  <CustomButton
                    isSubmitting={formik.isSubmitting}
                    isValid={formik.isValid}
                    buttonText={formatMessage({ id: "Add Thesis" })}
                    loading={loading}
                    widthLoading={2}
                    width={2}
                    margin={"me-5 mt-5"}
                  />
                </Modal.Footer>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </div>
  );
};
export default InvestmentThesisModal;
