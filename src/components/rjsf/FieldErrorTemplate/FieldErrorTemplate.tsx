import {
  FieldErrorProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  errorId,
} from "@rjsf/utils";

/**
 * FieldErrorTemplate component for React JSON Schema Form (RJSF).
 *
 * This component renders a list of field-specific errors for a form field in an RJSF form.
 * It provides a way to display validation errors directly beneath the corresponding form field.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @param {FieldErrorProps<T, S, F>} props - The props required by the FieldErrorTemplate component.
 * @param {Array<string>} [props.errors] - An array of error messages to be displayed for the form field.
 * @param {Object} props.idSchema - The schema for the field's ID, used to generate the unique error element ID.
 *
 * @returns {JSX.Element | null} A list element containing the error messages, or null if there are no errors.
 */
export default function FieldErrorTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: FieldErrorProps<T, S, F>) {
  const { errors = [], idSchema } = props;
  if (errors.length === 0) {
    return null;
  }
  const id = errorId<T>(idSchema);

  return (
    <ul style={{ listStyleType: "none", listStylePosition: "inside" }} id={id}>
      {errors.map((error, i) => {
        return (
          <li key={i} style={{ padding: "0", margin: "0", borderWidth: "0" }}>
            <small style={{ margin: "0", color: "#EF4444" }}>{error}</small>
          </li>
        );
      })}
    </ul>
  );
}
