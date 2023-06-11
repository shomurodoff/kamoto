import React from "react";
import TextInput from "../../../widgets/components/Input/TextInput";
import { useIntl } from "react-intl";
import { Form, Formik } from "formik";
import TextArea from "../../../widgets/components/Input/TextArea";
import { InfoCard } from "../../../widgets/components/UI/InfoCard";
import Slider from "rc-slider";
import { SelectInput } from "../../../widgets/components/Input/SelectInput";
import Select from "../../../../components/select/select";
const NegativeLearning: React.FC<any> = ({ setOpenEdit }) => {
    const { formatMessage } = useIntl();
    return (
        <div className={"grid grid-cols-12 gap-y-[20px] md:gap-x-[40px]"}>
            <Formik initialValues={{}} onSubmit={() => {}}>
                {(formik) => {
                    return (
                        <Form className={"col-span-12 md:col-span-7 order-0"}>
                            <div className={"mb-[24px]"}>
                                <Select
                                    toltipText={"Topics this personality do not want to talk about"}
                                    label={"Topics this personality do not want to talk about"}
                                    className={"without-arrow"}
                                    isMulti={true}
                                    isClearable={false}
                                    options={[
                                        { value: "chocolate", label: "Chocolate" },
                                        { value: "strawberry", label: "Strawberry" },
                                        { value: "vanilla", label: "Vanilla" },
                                    ]}
                                />
                            </div>
                            <TextArea
                                label={formatMessage({
                                    id: "Standard reply when asked about above topics",
                                })}
                                fieldName={"replies"}
                                placeholder={formatMessage({
                                    id: "Write a paragraph describing who your personality is",
                                })}
                                defaultValue={"I respectfully steer clear of discussing politics, family matters, sex, and religion. These subjects are personal and sensitive. My focus is on spreading joy and entertainment through my work. I believe in keeping my personal life separate from my professional persona."}
                                formik={formik}
                                toolTipText={"text"}
                                className={"!min-h-[142px]"}
                            />
                            <TextArea
                                label={formatMessage({
                                    id: "Standard reply when there is a server error",
                                })}
                                fieldName={"description"}
                                placeholder={formatMessage({
                                    id: "Standard reply when there is a server error",
                                })}
                                defaultValue={
                                    "Ah, it seems we've hit a snag in our conversation due to internet issues or a server glitch. Don't worry, these things happen. Just like in my films, a little drama adds suspense. We'll reconnect soon!"
                                }
                                formik={formik}
                                toolTipText={"text"}
                                className={"!min-h-[140px]"}
                            />
                        </Form>
                    );
                }}
            </Formik>
            <div
                className={
                    "col-span-12 md:col-span-5 flex flex-col justify-start gap-[20px]"
                }
            >
                <div className={"flex justify-end gap-[10px] md:order-1 md:mt-auto"}>
                    <button
                        onClick={() => setOpenEdit(false)}
                        className={
                            "bg-[#C2D24B1A] text-[#C2D24B] text-[14px] leading-5 font-medium py-[12px] w-1/2 md:w-[128px] rounded"
                        }
                    >
                        Cancel
                    </button>
                    <button
                        className={
                            "bg-[#C2D24B] text-black text-[14px] leading-5 font-medium py-[12px] w-1/2  md:w-[140px] rounded"
                        }
                    >
                        Save
                    </button>
                </div>
                <InfoCard
                    title={formatMessage({ id: "Understanding Negative Learning of AI Personality" })}
                    desc={formatMessage({
                        id: "In KamotoAI, the \"Negative Learning\" section gives you control over the topics your AI personality do not engages with. You can identify and define restricted topics, ensuring that your AI personality avoids discussing sensitive subjects such as politics, family's private information, sex, pornography, guns law, religion, and more. \n" +
                            "<br/>" +
                            "<br/>" +
                            "By setting these boundaries, you create a safe and respectful environment for users to interact with your AI personality. When faced with restricted topics, your AI personality can deliver standard replies that redirect the conversation or politely decline to engage. With KamotoAI, you have the power to curate a positive and inclusive experience, where users can confidently engage with your AI personality without encountering uncomfortable or inappropriate discussions."  })}
                    slug={"#"}
                />
            </div>
        </div>
    );
};

export default NegativeLearning;


