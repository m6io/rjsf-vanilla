import { ChangeEvent, FocusEvent } from "react";
import {
  ariaDescribedByIds,
  enumOptionsDeselectValue,
  enumOptionsIsSelected,
  enumOptionsSelectValue,
  enumOptionsValueForIndex,
  optionId,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from "@rjsf/utils";

/**
 * CheckboxesWidget component for React JSON Schema Form (RJSF).
 *
 * This component renders a group of checkboxes for selecting multiple options within an RJSF form.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @param {WidgetProps<T, S, F>} props - The props required by the CheckboxesWidget component.
 * @param {string} props.id - The unique identifier for the widget.
 * @param {boolean} [props.disabled] - Indicates whether the widget is disabled.
 * @param {Object} props.options - The options for the widget, including enum options and additional settings.
 * @param {any} [props.value] - The current value of the widget.
 * @param {boolean} [props.autofocus] - Indicates whether the widget should automatically receive focus.
 * @param {boolean} [props.readonly] - Indicates whether the widget is read-only.
 * @param {boolean} [props.required] - Indicates whether the widget is required.
 * @param {Function} props.onChange - The function to call when the value of the widget changes.
 * @param {Function} props.onBlur - The function to call when the widget loses focus.
 * @param {Function} props.onFocus - The function to call when the widget gains focus.
 *
 * @returns {JSX.Element} A div element containing the group of checkboxes.
 */
export default function CheckboxesWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({
  id,
  disabled,
  options,
  value,
  autofocus,
  readonly,
  required,
  onChange,
  onBlur,
  onFocus,
}: WidgetProps<T, S, F>) {
  const { enumOptions, enumDisabled, inline, emptyValue } = options;
  const checkboxesValues = Array.isArray(value) ? value : [value];

  const _onChange =
    (index: number) =>
    ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
      if (checked) {
        onChange(
          enumOptionsSelectValue<S>(index, checkboxesValues, enumOptions)
        );
      } else {
        onChange(
          enumOptionsDeselectValue<S>(index, checkboxesValues, enumOptions)
        );
      }
    };

  const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onBlur(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue));
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onFocus(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue));

  return (
    <div style={{ marginBottom: "16px" }}>
      {Array.isArray(enumOptions) &&
        enumOptions.map((option, index: number) => {
          const checked = enumOptionsIsSelected<S>(
            option.value,
            checkboxesValues
          );
          const itemDisabled =
            Array.isArray(enumDisabled) &&
            enumDisabled.indexOf(option.value) !== -1;

          return (
            <div
              key={option.value}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: inline ? "0" : "8px",
                marginRight: inline ? "8px" : "0",
              }}
            >
              <input
                type="checkbox"
                id={optionId(id, index)}
                name={id}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                }}
                required={required}
                checked={checked}
                autoFocus={autofocus && index === 0}
                onChange={_onChange(index)}
                onBlur={_onBlur}
                onFocus={_onFocus}
                disabled={disabled || itemDisabled || readonly}
                aria-describedby={ariaDescribedByIds<T>(id)}
              />
              <label
                htmlFor={optionId(id, index)}
                style={{ cursor: "pointer" }}
              >
                {option.label}
              </label>
            </div>
          );
        })}
    </div>
  );
}
