import { ChangeEvent, FocusEvent } from "react";
import {
  ariaDescribedByIds,
  enumOptionsIsSelected,
  enumOptionsValueForIndex,
  optionId,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from "@rjsf/utils";
/**
 * RadioWidget component for React JSON Schema Form (RJSF).
 *
 * This component renders a set of radio buttons for selecting a single option from a list within an RJSF form.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @param {WidgetProps<T, S, F>} props - The props required by the RadioWidget component.
 * @param {string} props.id - The unique identifier for the widget.
 * @param {Object} props.options - The options for the widget, including enum options and additional settings.
 * @param {any} [props.value] - The current value of the widget.
 * @param {boolean} [props.required] - Indicates whether the widget is required.
 * @param {boolean} [props.disabled] - Indicates whether the widget is disabled.
 * @param {boolean} [props.readonly] - Indicates whether the widget is read-only.
 * @param {Function} props.onChange - The function to call when the value of the widget changes.
 * @param {Function} props.onBlur - The function to call when the widget loses focus.
 * @param {Function} props.onFocus - The function to call when the widget gains focus.
 *
 * @returns {JSX.Element} A div element containing the set of radio buttons.
 */

export default function RadioWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({
  id,
  options,
  value,
  required,
  disabled,
  readonly,
  onChange,
  onBlur,
  onFocus,
}: WidgetProps<T, S, F>) {
  const { enumOptions, enumDisabled, emptyValue } = options;

  const _onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    onChange(enumOptionsValueForIndex<S>(value, enumOptions, emptyValue));
  const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onBlur(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue));
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onFocus(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue));

  const inline = Boolean(options && options.inline);

  return (
    <div style={{ marginBottom: 0 }}>
      {Array.isArray(enumOptions) &&
        enumOptions.map((option, index) => {
          const itemDisabled =
            Array.isArray(enumDisabled) &&
            enumDisabled.indexOf(option.value) !== -1;
          const checked = enumOptionsIsSelected<S>(option.value, value);

          const radio = (
            <label
              key={index}
              style={{
                display: inline ? "flex" : "block",
                alignItems: inline ? "center" : undefined,
                marginRight: inline ? "0.75rem" : undefined,
              }}
            >
              <input
                id={optionId(id, index)}
                name={id}
                type="radio"
                disabled={disabled || itemDisabled || readonly}
                checked={checked}
                required={required}
                value={String(index)}
                onChange={_onChange}
                onBlur={_onBlur}
                onFocus={_onFocus}
                aria-describedby={ariaDescribedByIds<T>(id)}
                style={{
                  margin: 0,
                  fontSize: "1rem",
                  width: "1.25em",
                  height: "1.25em",
                  cursor: disabled || readonly ? "not-allowed" : "pointer",
                }}
              />
              <span
                style={{
                  marginLeft: "0.5rem",
                }}
              >
                {option.label}
              </span>
            </label>
          );
          return radio;
        })}
    </div>
  );
}
