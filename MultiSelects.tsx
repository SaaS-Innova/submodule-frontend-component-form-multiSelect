import { Controller, useFormContext } from "react-hook-form";
import { inputValidator } from "../../../../library/utilities/helperFunction";
import { MultiSelect } from "primereact/multiselect";
import { IMultiSelect } from "./multiSelect.model";
import { IFormFieldType } from "../../../../library/utilities/constant";
import { FormFieldError } from "../formFieldError/FormFieldError";

export const MultiSelects = (props: IMultiSelect) => {
  const {
    attribute,
    form,
    fieldType,
    optionLabel = "label",
    maxSelectedLabels
  } = props;
  const { label, options,placeholder } = form[attribute];
  const { required, disabled } = form[attribute].rules;
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const getClassNames = () => {
    let labelClassName = "";
    let fieldClassName = "";
    let divClassName = "";

    switch (fieldType) {
      case IFormFieldType.NO_LABEL:
        labelClassName = "";
        fieldClassName = "field grid";
        divClassName = "";
        break;
      case IFormFieldType.TOP_LABEL:
        labelClassName = "";
        fieldClassName = "field p-fluid";
        divClassName = "";
        break;
      default:
        labelClassName = "col-12 mb-3 md:col-3 md:mb-0";
        fieldClassName = "field grid";
        divClassName = "col-12 md:col-9";
        break;
    }

    return { labelClassName, fieldClassName, divClassName };
  };
  const { labelClassName, fieldClassName, divClassName } = getClassNames();
  
  const labelElement = (
    <label htmlFor={attribute} className={labelClassName}>
      {label} {required && "*"}
    </label>
  );

  return (
    <div className={fieldClassName}>
      {fieldType !== IFormFieldType.NO_LABEL && labelElement}
      <div className={divClassName}>
      <Controller
        name={attribute}
        control={control}
        rules={inputValidator(form[attribute].rules, label)}
        render={({ field }) => (
          <MultiSelect
            id={attribute}
            value={field.value} 
            options={options}
            disabled={disabled}
            placeholder={placeholder}
            optionLabel={optionLabel}
            maxSelectedLabels={maxSelectedLabels}
            filter
            className={`w-full ${errors[attribute] ? "p-invalid" : ""}`}
            onChange={(e) => {
             field.onChange(e.value);
            }}
          />
        )}
      />
        <FormFieldError data={{ errors, name: attribute }} />
      </div>
    </div>
  );
};