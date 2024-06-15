import { useState } from "react";
import { ChangeEvent, FocusEvent } from "react";
import {
  ariaDescribedByIds,
  FormContextType,
  enumOptionsIndexForValue,
  enumOptionsValueForIndex,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from "@rjsf/utils";

/**
 * SelectWidget component for React JSON Schema Form (RJSF).
 *
 * This component renders a dropdown (select) input for selecting one or multiple values from a list of options.
 * The component provides visual feedback for validation errors and focuses using border colors.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @param {WidgetProps<T, S, F>} props - The props required by the SelectWidget component.
 * @param {Object} props.schema - The JSON schema for the widget.
 * @param {string} props.id - The unique identifier for the widget.
 * @param {Object} props.options - The options for the widget, including enum options and additional settings.
 * @param {boolean} [props.required] - Indicates whether the widget is required.
 * @param {boolean} [props.disabled] - Indicates whether the widget is disabled.
 * @param {boolean} [props.readonly] - Indicates whether the widget is read-only.
 * @param {any} [props.value] - The current value of the widget.
 * @param {boolean} [props.multiple] - Indicates whether multiple values can be selected.
 * @param {boolean} [props.autofocus] - Indicates whether the widget should automatically receive focus.
 * @param {Function} props.onChange - The function to call when the value of the widget changes.
 * @param {Function} props.onBlur - The function to call when the widget loses focus.
 * @param {Function} props.onFocus - The function to call when the widget gains focus.
 * @param {string} [props.placeholder] - The placeholder text for the widget.
 * @param {Array<string>} [props.rawErrors] - An array of raw error messages associated with the widget.
 *
 * @returns {JSX.Element} A select element for choosing one or multiple values from a list.
 */

export default function SelectWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({
  schema,
  id,
  options,
  required,
  disabled,
  readonly,
  value,
  multiple,
  autofocus,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  rawErrors = [],
}: WidgetProps<T, S, F>) {
  const { enumOptions, enumDisabled, emptyValue: optEmptyValue } = options;

  const [isFocused, setIsFocused] = useState(false);
  const borderColor =
    rawErrors.length > 0 ? "#EF4444" : isFocused ? "#3B82F6" : "#D1D5DB";

  const getSelectStyles = () => ({
    border: `1px solid ${borderColor}`,
    borderRadius: "0.375rem",
    padding: "0.5rem",
    outline: "none",
    width: "100%",
    backgroundColor: "transparent",
  });

  const emptyValue = multiple ? [] : "";

  function getValue(event: FocusEvent | ChangeEvent | any, multiple?: boolean) {
    if (multiple) {
      return [].slice
        .call(event.target.options)
        .filter((o: any) => o.selected)
        .map((o: any) => o.value);
    } else {
      return event.target.value;
    }
  }

  const selectedIndexes = enumOptionsIndexForValue<S>(
    value,
    enumOptions,
    multiple
  );

  return (
    <select
      id={id}
      name={id}
      value={
        typeof selectedIndexes === "undefined" ? emptyValue : selectedIndexes
      }
      required={required}
      multiple={multiple}
      disabled={disabled || readonly}
      autoFocus={autofocus}
      style={getSelectStyles()}
      onBlur={
        onBlur &&
        ((event: FocusEvent) => {
          setIsFocused(false);
          const newValue = getValue(event, multiple);
          onBlur(
            id,
            enumOptionsValueForIndex<S>(newValue, enumOptions, optEmptyValue)
          );
        })
      }
      onFocus={
        onFocus &&
        ((event: FocusEvent) => {
          setIsFocused(true);
          const newValue = getValue(event, multiple);
          onFocus(
            id,
            enumOptionsValueForIndex<S>(newValue, enumOptions, optEmptyValue)
          );
        })
      }
      onChange={(event: ChangeEvent) => {
        const newValue = getValue(event, multiple);
        onChange(
          enumOptionsValueForIndex<S>(newValue, enumOptions, optEmptyValue)
        );
      }}
      aria-describedby={ariaDescribedByIds<T>(id)}
    >
      {!multiple && schema.default === undefined && (
        <option value="">{placeholder}</option>
      )}
      {(enumOptions as any).map(({ value, label }: any, i: number) => {
        const disabled =
          Array.isArray(enumDisabled) && enumDisabled.indexOf(value) !== -1;
        return (
          <option key={i} id={label} value={String(i)} disabled={disabled}>
            {label}
          </option>
        );
      })}
    </select>
  );
}
