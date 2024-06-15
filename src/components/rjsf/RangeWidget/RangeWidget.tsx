import {
  FormContextType,
  getTemplate,
  labelValue,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from "@rjsf/utils";

/**
 * RangeWidget component for React JSON Schema Form (RJSF).
 *
 * This component renders a range input slider for selecting a numeric value within a specified range.
 * It utilizes the BaseInputTemplate to ensure consistent styling and behavior, and displays the current value of the range slider.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @param {WidgetProps<T, S, F>} props - The props required by the RangeWidget component.
 * @param {any} props.value - The current value of the range slider.
 * @param {string} [props.label] - The label for the range input.
 * @param {boolean} [props.hideLabel] - Indicates whether the label should be hidden.
 * @param {Object} props.options - Additional options for the range input.
 * @param {Object} props.registry - The registry containing various utility functions and components, including templates.
 *
 * @returns {JSX.Element} A range input element with the current value displayed.
 */

export default function RangeWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: WidgetProps<T, S, F>) {
  const { value, label, hideLabel, options, registry } = props;
  const BaseInputTemplate = getTemplate<"BaseInputTemplate", T, S, F>(
    "BaseInputTemplate",
    registry,
    options
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <BaseInputTemplate
        {...props}
        type="range"
        extraProps={{ label: labelValue(label || undefined, hideLabel) }}
      >
        {value && (
          <span
            style={{
              display: "inline-block",
              padding: "0.375rem 0.75rem",
              marginBottom: "0.375rem",
              fontSize: "1rem",
              fontWeight: 400,
              lineHeight: 1.5,
              color: "#495057",
              textAlign: "center",
              backgroundColor: "#e9ecef",
              border: "1px solid #ced4da",
              borderRadius: "0.25rem",
              width: "100px",
            }}
          >
            {value}
          </span>
        )}
      </BaseInputTemplate>
    </div>
  );
}
