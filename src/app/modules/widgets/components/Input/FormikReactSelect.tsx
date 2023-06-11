import { useField, useFormikContext } from "formik";
import React from "react";
import Select, { StylesConfig } from "react-select";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";
import clsx from "clsx";
import { ToolTipUI } from "../../components/UI/ToolTipUI";

type MyOption = {
  label: string;
  value: any;
};

type GroupedOption = {
  label: string; // group label
  options: MyOption[];
};

type Props = {
  name: string;
  label: string;
  tooltipText: string;
} & Omit<
  StateManagerProps<MyOption, false | true, GroupedOption>,
  "value" | "onChange"
>;

const colourStyles: StylesConfig<MyOption, false | true, GroupedOption> = {
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: "#2E2F45",
    borderWidth: "1px",
    borderColor: isFocused ? "#474761" : "#323248",
    boxShadow: "none",
    color: "#FFFFFFCC",
  }),
  menu: (styles) => {
    return {
      ...styles,
      backgroundColor: "#2E2F45",
      color: "#FFFFFFCC",
    };
  },
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      color: isDisabled ? "#red" : isSelected ? "white" : "black",
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...styles[":active"],
      },
    };
  },

  input: (styles) => ({ ...styles }),
  placeholder: (styles) => ({ ...styles }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "background: #FFFFFFCC",
  }),
  multiValue: (styles) => {
    return {
      ...styles,
      alignItems: "center",
      backgroundColor: "#171825",
      borderRadius: "40px",
      padding: "2px 10px",
      color: "#FFFFFFCC",
    };
  },
};

const FormikReactSelect: React.FC<any> = (props: Props) => {
  const { name, className, label, tooltipText, ...restProps } = props;
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();

  //flatten the options so that it will be easier to find the value
  const flattenedOptions = props.options?.flatMap((o: any) => {
    const isNotGrouped = "value" in o;
    if (isNotGrouped) {
      return o;
    } else {
      return o.options;
    }
  });

  //get the value using flattenedOptions and field.value
  const value = flattenedOptions?.filter((o: any) => {
    const isArrayValue = Array.isArray(field.value);

    if (isArrayValue) {
      const values = field.value as Array<any>;
      return values.includes(o.value);
    } else {
      return field.value === o.value;
    }
  });

  return (
    <div className={"mb-[16px] md:mb-[24px]"}>
      <label
        className={
          "flex gap-2 items-center text-[13px] leading-5 text-[#FFFFFFA6] mb-1"
        }
      >
        {label}
        <ToolTipUI tooltipText={tooltipText} />
      </label>
      <Select
        {...restProps}
        value={value}
        // onChange implementation
        onChange={(val) => {
          //here I used explicit typing but there maybe a better way to type the value.
          const _val = val as MyOption[] | MyOption;
          const isArray = Array.isArray(_val);
          if (isArray) {
            const values = _val.map((o) => o.value);
            setFieldValue(name, values);
          } else {
            setFieldValue(name, _val.value);
          }
        }}
        className={clsx(className, "react-select")}
        styles={colourStyles}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "#C2D24B",
            primary: "#FFFFFF1A",
          },
        })}
      />
    </div>
  );
};

export default FormikReactSelect;
