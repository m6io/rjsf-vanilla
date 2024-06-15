import {
  FieldTemplateProps,
  FormContextType,
  getTemplate,
  getUiOptions,
  RJSFSchema,
  StrictRJSFSchema,
} from "@rjsf/utils";

/**
 * FieldTemplate component for React JSON Schema Form (RJSF).
 *
 * This component provides a custom layout for a form field in an RJSF form.
 * It wraps the field's label, description, errors, and help text, applying appropriate styles and structure.
 * Additionally, it handles special cases such as hidden fields and fields with additional properties.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @param {FieldTemplateProps<T, S, F>} props - The props required by the FieldTemplate component.
 * @param {string} props.id - The unique identifier for the form field.
 * @param {React.ReactNode} props.children - The child elements to be rendered within the field.
 * @param {boolean} props.displayLabel - Indicates whether the field label should be displayed.
 * @param {Array<string>} [props.rawErrors] - An array of raw error messages associated with the field.
 * @param {React.ReactNode} [props.errors] - The error messages to be displayed for the field.
 * @param {React.ReactNode} [props.help] - The help text to be displayed for the field.
 * @param {React.ReactNode} [props.description] - The description to be displayed for the field.
 * @param {string} [props.rawDescription] - The raw description text.
 * @param {string} [props.classNames] - The CSS class names for the field.
 * @param {Object} [props.style] - The inline styles for the field.
 * @param {boolean} [props.disabled] - Indicates whether the field is disabled.
 * @param {string} [props.label] - The label for the field.
 * @param {boolean} [props.hidden] - Indicates whether the field is hidden.
 * @param {Function} [props.onDropPropertyClick] - The function to call when a property is dropped.
 * @param {Function} [props.onKeyChange] - The function to call when a key is changed.
 * @param {boolean} [props.readonly] - Indicates whether the field is read-only.
 * @param {boolean} [props.required] - Indicates whether the field is required.
 * @param {Object} props.schema - The JSON schema for the field.
 * @param {Object} props.uiSchema - The UI schema for the field.
 * @param {Object} props.registry - The registry containing various utility functions and components.
 *
 * @returns {JSX.Element} A div element containing the field and its associated elements, styled and structured according to the props.
 */
export default function FieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({
  id,
  children,
  displayLabel,
  rawErrors = [],
  errors,
  help,
  description,
  rawDescription,
  classNames,
  style,
  disabled,
  label,
  hidden,
  onDropPropertyClick,
  onKeyChange,
  readonly,
  required,
  schema,
  uiSchema,
  registry,
}: FieldTemplateProps<T, S, F>) {
  const uiOptions = getUiOptions(uiSchema);
  const WrapIfAdditionalTemplate = getTemplate<
    "WrapIfAdditionalTemplate",
    T,
    S,
    F
  >("WrapIfAdditionalTemplate", registry, uiOptions);

  if (hidden) {
    return <div style={{ display: "none" }}>{children}</div>;
  }

  return (
    <WrapIfAdditionalTemplate
      classNames={classNames}
      style={style}
      disabled={disabled}
      id={id}
      label={label}
      onDropPropertyClick={onDropPropertyClick}
      onKeyChange={onKeyChange}
      readonly={readonly}
      required={required}
      schema={schema}
      uiSchema={uiSchema}
      registry={registry}
    >
      <div style={{ marginBottom: "1rem", display: "block" }}>
        {displayLabel && (
          <label
            htmlFor={id}
            style={{
              marginBottom: "0.5rem",
              display: "inline-block",
              color: rawErrors.length > 0 ? "#EF4444" : undefined,
            }}
          >
            {label}
            {required ? "*" : null}
          </label>
        )}
        {children}
        {displayLabel && rawDescription && (
          <small style={{ marginTop: "0.25rem", display: "block" }}>
            <div style={rawErrors.length > 0 ? { color: "#EF4444" } : {}}>
              {description}
            </div>
          </small>
        )}
        {errors}
        {help}
      </div>
    </WrapIfAdditionalTemplate>
  );
}
