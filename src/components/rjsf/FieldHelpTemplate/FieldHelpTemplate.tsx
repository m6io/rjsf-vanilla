import {
  FieldHelpProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  helpId,
} from "@rjsf/utils";

/**
 * FieldHelpTemplate component for React JSON Schema Form (RJSF).
 *
 * This component renders help text for a form field in an RJSF form.
 * It provides a way to display additional information or guidance beneath the corresponding form field.
 * The help text color changes based on whether the field has validation errors.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @param {FieldHelpProps<T, S, F>} props - The props required by the FieldHelpTemplate component.
 * @param {Object} props.idSchema - The schema for the field's ID, used to generate the unique help element ID.
 * @param {string} [props.help] - The help text to be displayed for the form field.
 * @param {boolean} [props.hasErrors] - Indicates whether the form field has validation errors.
 *
 * @returns {JSX.Element | null} A span element containing the help text, or null if no help text is provided.
 */
export default function FieldHelpTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: FieldHelpProps<T, S, F>) {
  const { idSchema, help, hasErrors } = props;
  if (!help) {
    return null;
  }
  const id = helpId<T>(idSchema);
  return (
    <span
      style={hasErrors ? { color: "#EF4444" } : { color: "#4B5563" }}
      id={id}
    >
      {help}
    </span>
  );
}
