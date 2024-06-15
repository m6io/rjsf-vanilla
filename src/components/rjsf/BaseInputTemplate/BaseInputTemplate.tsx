import { ChangeEvent, FocusEvent, useState } from "react";
import {
  ariaDescribedByIds,
  BaseInputTemplateProps,
  examplesId,
  FormContextType,
  getInputProps,
  RJSFSchema,
  StrictRJSFSchema,
} from "@rjsf/utils";

/**
 * BaseInputTemplate component for React JSON Schema Form (RJSF).
 *
 * This component renders a basic input field with customized styles and behavior for use in RJSF forms.
 * It also provides integration with example data and error handling.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @param {BaseInputTemplateProps<T, S, F>} props - The props required by the BaseInputTemplate component.
 * @param {string} props.id - The unique identifier for the input field.
 * @param {string} [props.placeholder] - The placeholder text for the input field.
 * @param {boolean} [props.required] - Indicates whether the input field is required.
 * @param {boolean} [props.readonly] - Indicates whether the input field is read-only.
 * @param {boolean} [props.disabled] - Indicates whether the input field is disabled.
 * @param {string} [props.type] - The type of the input field (e.g., text, number, etc.).
 * @param {any} [props.value] - The current value of the input field.
 * @param {Function} props.onChange - The function to call when the input value changes.
 * @param {Function} [props.onChangeOverride] - An optional override function for handling input value changes.
 * @param {Function} props.onBlur - The function to call when the input loses focus.
 * @param {Function} props.onFocus - The function to call when the input gains focus.
 * @param {boolean} [props.autofocus] - Indicates whether the input field should automatically receive focus.
 * @param {Object} [props.options] - Additional options for the input field.
 * @param {Object} props.schema - The JSON schema for the input field.
 * @param {Array} [props.rawErrors] - An array of error messages associated with the input field.
 * @param {React.ReactNode} [props.children] - Any child elements to be rendered with the input field.
 * @param {Object} [props.extraProps] - Extra properties to be applied to the input field.
 *
 * @returns {JSX.Element} An input element with customized styles and behavior.
 */
export default function BaseInputTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({
  id,
  placeholder,
  required,
  readonly,
  disabled,
  type,
  value,
  onChange,
  onChangeOverride,
  onBlur,
  onFocus,
  autofocus,
  options,
  schema,
  rawErrors = [],
  children,
  extraProps,
}: BaseInputTemplateProps<T, S, F>) {
  const [isFocused, setIsFocused] = useState(false);

  const inputProps = {
    ...extraProps,
    ...getInputProps<T, S, F>(schema, type, options),
  };
  const _onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    onChange(value === "" ? options.emptyValue : value);
  const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur(id, value);
  };
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus(id, value);
  };

  const borderColor =
    rawErrors.length > 0 ? "#EF4444" : isFocused ? "#3B82F6" : "#D1D5DB";

  const inputStyle = {
    border: `1px solid ${borderColor}`,
    borderRadius: "0.375rem",
    padding: "0.5rem",
    width: "100%",
    backgroundColor: "transparent",
    outline: "none",
  };

  return (
    <>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoFocus={autofocus}
        required={required}
        disabled={disabled}
        readOnly={readonly}
        style={inputStyle}
        list={schema.examples ? examplesId<T>(id) : undefined}
        {...inputProps}
        value={value || value === 0 ? value : ""}
        onChange={onChangeOverride || _onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        aria-describedby={ariaDescribedByIds<T>(id, !!schema.examples)}
      />
      {children}
      {Array.isArray(schema.examples) ? (
        <datalist id={examplesId<T>(id)}>
          {(schema.examples as string[])
            .concat(
              schema.default && !schema.examples.includes(schema.default)
                ? ([schema.default] as string[])
                : []
            )
            .map((example: any) => {
              return <option key={example} value={example} />;
            })}
        </datalist>
      ) : null}
    </>
  );
}
