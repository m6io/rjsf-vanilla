import React, { useState } from "react";
import {
  FormContextType,
  getSubmitButtonOptions,
  RJSFSchema,
  StrictRJSFSchema,
  SubmitButtonProps,
} from "@rjsf/utils";

/**
 * SubmitButton component for React JSON Schema Form (RJSF).
 *
 * This component renders a customizable submit button for a form.
 * It can be conditionally rendered based on the `norender` option.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @param {SubmitButtonProps<T, S, F>} props - The props required by the SubmitButton component.
 * @param {Object} props.uiSchema - The UI schema for the form, used to get submit button options.
 * @param {string} [props.uiSchema.submitText] - The text to be displayed on the submit button.
 * @param {boolean} [props.uiSchema.norender] - If true, the submit button will not be rendered.
 * @param {Object} [props.uiSchema.props] - Additional props to be passed to the submit button.
 *
 * @returns {JSX.Element | null} A button element styled for submission, or null if `norender` is true.
 */

export default function SubmitButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: SubmitButtonProps<T, S, F>) {
  const {
    submitText,
    norender,
    props: submitButtonProps,
  } = getSubmitButtonOptions<T, S, F>(props.uiSchema);

  const [hover, setHover] = useState(false);

  const defaultStyles = {
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    borderRadius: "0.25rem",
    fontSize: "1rem",
    lineHeight: "1.5rem",
    fontWeight: 400,
    color: "#ffffff",
    backgroundColor: "#3B82F6",
  };

  const hoverStyles = {
    backgroundColor: "#1D4ED8", // Corresponds to hover:bg-blue-700
  };

  if (norender) {
    return null;
  }

  return (
    <div>
      <button
        type="submit"
        style={hover ? { ...defaultStyles, ...hoverStyles } : defaultStyles}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        {...submitButtonProps}
      >
        {submitText}
      </button>
    </div>
  );
}
