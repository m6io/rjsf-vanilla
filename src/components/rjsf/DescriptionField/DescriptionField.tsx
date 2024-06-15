import {
  DescriptionFieldProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from "@rjsf/utils";

/**
 * DescriptionField component for React JSON Schema Form (RJSF).
 *
 * This component renders the description for a form field in an RJSF form.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @param {DescriptionFieldProps<T, S, F>} props - The props required by the DescriptionField component.
 * @param {string} props.id - The unique identifier for the description field.
 * @param {string} [props.description] - The description text to be displayed.
 *
 * @returns {JSX.Element | null} A div element containing the description text, or null if no description is provided.
 */
export default function DescriptionField<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({ id, description }: DescriptionFieldProps<T, S, F>) {
  if (description) {
    return (
      <div>
        <div id={id} style={{ marginBottom: "1rem" }}>
          {description}
        </div>
      </div>
    );
  }

  return null;
}
