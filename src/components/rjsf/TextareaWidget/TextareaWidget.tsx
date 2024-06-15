import { ChangeEvent, FocusEvent } from "react";
import {
  ariaDescribedByIds,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from "@rjsf/utils";

type CustomWidgetProps<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
> = WidgetProps<T, S, F> & {
  options: any;
};
/**
 * TextareaWidget component for React JSON Schema Form (RJSF).
 *
 * This component renders a textarea input for multi-line text input within an RJSF form.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @param {CustomWidgetProps<T, S, F>} props - The props required by the TextareaWidget component.
 * @param {string} props.id - The unique identifier for the widget.
 * @param {string} [props.placeholder] - The placeholder text for the textarea.
 * @param {any} [props.value] - The current value of the textarea.
 * @param {boolean} [props.required] - Indicates whether the textarea is required.
 * @param {boolean} [props.disabled] - Indicates whether the textarea is disabled.
 * @param {boolean} [props.autofocus] - Indicates whether the textarea should automatically receive focus.
 * @param {boolean} [props.readonly] - Indicates whether the textarea is read-only.
 * @param {Function} props.onBlur - The function to call when the textarea loses focus.
 * @param {Function} props.onFocus - The function to call when the textarea gains focus.
 * @param {Function} props.onChange - The function to call when the value of the textarea changes.
 * @param {Object} props.options - Additional options for the textarea, including the number of rows.
 *
 * @returns {JSX.Element} A textarea element for multi-line text input.
 */
export default function TextareaWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({
  id,
  placeholder,
  value,
  required,
  disabled,
  autofocus,
  readonly,
  onBlur,
  onFocus,
  onChange,
  options,
}: CustomWidgetProps<T, S, F>) {
  const _onChange = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) =>
    onChange(value === "" ? options.emptyValue : value);
  const _onBlur = ({ target: { value } }: FocusEvent<HTMLTextAreaElement>) =>
    onBlur(id, value);
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLTextAreaElement>) =>
    onFocus(id, value);

  const textareaStyles = {
    border: "1px solid #D1D5DB",
    borderRadius: "0.375rem",
    padding: "0.5rem",
    width: "100%",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <textarea
        style={textareaStyles}
        id={id}
        name={id}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        value={value}
        required={required}
        autoFocus={autofocus}
        rows={options.rows || 5}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        aria-describedby={ariaDescribedByIds<T>(id)}
      />
    </div>
  );
}
