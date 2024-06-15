import {
  ErrorListProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
} from "@rjsf/utils";

/**
 * ErrorList component for React JSON Schema Form (RJSF).
 *
 * This component renders a list of errors for a form, displaying each error in a list.
 * It provides a way to visually present form validation errors to the user in a centralized location.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @param {ErrorListProps<T, S, F>} props - The props required by the ErrorList component.
 * @param {Array<Object>} props.errors - An array of error objects to be displayed.
 * @param {Object} props.registry - The registry containing various utility functions and components, including a translation function.
 *
 * @returns {JSX.Element} A div element containing the list of errors, styled to indicate validation issues.
 */
export default function ErrorList<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({ errors, registry }: ErrorListProps<T, S, F>) {
  const { translateString } = registry;

  return (
    <div
      style={{
        marginBottom: "1rem",
        borderRadius: "0.25rem",
        borderWidth: "1px",
        borderColor: "#B91C1C",
      }}
    >
      <div
        style={{
          color: "#450a0a",
          padding: "0.75rem",
          borderTopLeftRadius: "0.25rem",
          borderTopRightRadius: "0.25rem",
          backgroundColor: "#FEE2E2",
        }}
      >
        {translateString(TranslatableString.ErrorsLabel)}
      </div>
      <div style={{ padding: "0" }}>
        <ul>
          {errors.map((error, i: number) => {
            return (
              <li key={i} style={{ padding: "0.75rem", borderWidth: "0" }}>
                <span>{error.stack}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
