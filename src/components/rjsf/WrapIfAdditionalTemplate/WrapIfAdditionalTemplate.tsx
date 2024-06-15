import { useState } from "react";
import { FocusEvent } from "react";
import {
  ADDITIONAL_PROPERTY_FLAG,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
  WrapIfAdditionalTemplateProps,
} from "@rjsf/utils";

/**
 * WrapIfAdditionalTemplate component for React JSON Schema Form (RJSF).
 *
 * This component is used to wrap additional properties in an RJSF form.
 * It provides an interface to handle dynamically added properties, including a text input for the property key
 * and a remove button.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @param {WrapIfAdditionalTemplateProps<T, S, F>} props - The props required by the WrapIfAdditionalTemplate component.
 * @param {string} props.classNames - The CSS class names to apply to the wrapper div.
 * @param {Object} props.style - The inline styles to apply to the wrapper div.
 * @param {React.ReactNode} props.children - The child elements to be rendered within the wrapper.
 * @param {boolean} props.disabled - Indicates whether the property is disabled.
 * @param {string} props.id - The unique identifier for the property.
 * @param {string} props.label - The label for the property key input.
 * @param {Function} props.onDropPropertyClick - The function to call when the remove button is clicked.
 * @param {Function} props.onKeyChange - The function to call when the key input value changes.
 * @param {boolean} props.readonly - Indicates whether the property is read-only.
 * @param {boolean} props.required - Indicates whether the property is required.
 * @param {Object} props.schema - The JSON schema for the property.
 * @param {Object} props.uiSchema - The UI schema for the property.
 * @param {Object} props.registry - The registry containing various utility functions and components, including templates.
 *
 * @returns {JSX.Element} A div element containing the additional property interface.
 */
export default function WrapIfAdditionalTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({
  classNames,
  style,
  children,
  disabled,
  id,
  label,
  onDropPropertyClick,
  onKeyChange,
  readonly,
  required,
  schema,
  uiSchema,
  registry,
}: WrapIfAdditionalTemplateProps<T, S, F>) {
  const [isFocused, setIsFocused] = useState(false);

  const { templates, translateString } = registry;
  const { RemoveButton } = templates.ButtonTemplates;
  const keyLabel = translateString(TranslatableString.KeyLabel, [label]);
  const additional = ADDITIONAL_PROPERTY_FLAG in schema;

  if (!additional) {
    return (
      <div className={classNames} style={style}>
        {children}
      </div>
    );
  }

  const handleBlur = ({ target }: FocusEvent<HTMLInputElement>) => {
    onKeyChange(target.value);
    setIsFocused(false);
  };

  const handleFocus = () => setIsFocused(true);

  const keyId = `${id}-key`;

  return (
    <div className={classNames} style={{ ...style, display: "flex" }}>
      <div style={{ padding: "0.5rem", flex: "none", width: "50%" }}>
        <label
          htmlFor={keyId}
          style={{
            display: "block",
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            fontWeight: 500,
            color: "#374151",
          }}
        >
          {keyLabel}
        </label>
        <input
          required={required}
          defaultValue={label}
          disabled={disabled || readonly}
          id={keyId}
          name={keyId}
          onBlur={!readonly ? handleBlur : undefined}
          onFocus={handleFocus}
          type="text"
          style={{
            padding: "0.5rem",
            marginTop: "0.25rem",
            border: `1px solid ${isFocused ? "#3B82F6" : "#D1D5DB"}`,
            borderRadius: "0.375rem",
            width: "100%", // w-full
            backgroundColor: "transparent", // bg-background
            outline: "none",
          }}
        />
      </div>
      <div style={{ padding: "0.5rem", flex: "none", width: "50%" }}>
        {children}
      </div>
      <div style={{ padding: "0.5rem", flex: "none", width: "25%" }}>
        <RemoveButton
          iconType="block"
          style={{ width: "100%" }}
          disabled={disabled || readonly}
          onClick={onDropPropertyClick(label)}
          uiSchema={uiSchema}
          registry={registry}
        />
      </div>
    </div>
  );
}
