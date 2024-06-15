import {
  FormContextType,
  getUiOptions,
  RJSFSchema,
  StrictRJSFSchema,
  TitleFieldProps,
} from "@rjsf/utils";

/**
 * TitleField component for React JSON Schema Form (RJSF).
 *
 * This component renders a title field within an RJSF form.
 * It uses the uiSchema options to customize the display of the title.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @param {TitleFieldProps<T, S, F>} props - The props required by the TitleField component.
 * @param {string} props.id - The unique identifier for the title field.
 * @param {string} props.title - The title text to be displayed.
 * @param {Object} props.uiSchema - The UI schema for the title field.
 *
 * @returns {JSX.Element} A div element containing the title and a horizontal rule.
 */
export default function TitleField<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({ id, title, uiSchema }: TitleFieldProps<T, S, F>) {
  const uiOptions = getUiOptions<T, S, F>(uiSchema);

  return (
    <div id={id} style={{ marginTop: "0.25rem", marginBottom: "0.25rem" }}>
      <h5
        style={{
          marginBottom: "0.5rem",
          fontSize: "1.25rem",
          lineHeight: 1.25,
          fontWeight: 500,
        }}
      >
        {uiOptions.title || title}
      </h5>
      <hr
        style={{
          marginTop: "1rem",
          marginBottom: "1rem",
          borderTopWidth: "1px",
          borderColor: "#9CA3AF",
        }}
      />
    </div>
  );
}
