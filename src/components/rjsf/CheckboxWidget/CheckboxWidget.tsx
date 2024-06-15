import { FocusEvent } from "react";
import {
  ariaDescribedByIds,
  descriptionId,
  getTemplate,
  labelValue,
  WidgetProps,
  schemaRequiresTrueValue,
  StrictRJSFSchema,
  RJSFSchema,
  FormContextType,
} from "@rjsf/utils";

/**
 * CheckboxWidget component for React JSON Schema Form (RJSF).
 *
 * This component renders a checkbox input for boolean fields in an RJSF form.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @param {WidgetProps<T, S, F>} props - The props required by the CheckboxWidget component.
 * @param {string} props.id - The unique identifier for the widget.
 * @param {boolean} [props.value] - The current value of the checkbox.
 * @param {boolean} [props.disabled] - Indicates whether the widget is disabled.
 * @param {boolean} [props.readonly] - Indicates whether the widget is read-only.
 * @param {string} [props.label] - The label for the checkbox.
 * @param {boolean} [props.hideLabel] - Indicates whether the label should be hidden.
 * @param {Object} props.schema - The JSON schema for the checkbox field.
 * @param {boolean} [props.autofocus] - Indicates whether the widget should automatically receive focus.
 * @param {Object} props.options - The options for the widget, including additional settings.
 * @param {Function} props.onChange - The function to call when the value of the checkbox changes.
 * @param {Function} props.onBlur - The function to call when the checkbox loses focus.
 * @param {Function} props.onFocus - The function to call when the checkbox gains focus.
 * @param {Object} props.registry - The registry containing various utility functions and components, including templates.
 * @param {Object} props.uiSchema - The UI schema for the form.
 *
 * @returns {JSX.Element} A div element containing the checkbox input and its associated label and description.
 */
export default function CheckboxWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: WidgetProps<T, S, F>) {
  const {
    id,
    value,
    disabled,
    readonly,
    label,
    hideLabel,
    schema,
    autofocus,
    options,
    onChange,
    onBlur,
    onFocus,
    registry,
    uiSchema,
  } = props;

  const required = schemaRequiresTrueValue<S>(schema);
  const DescriptionFieldTemplate = getTemplate<
    "DescriptionFieldTemplate",
    T,
    S,
    F
  >("DescriptionFieldTemplate", registry, options);

  const _onChange = ({ target: { checked } }: FocusEvent<HTMLInputElement>) =>
    onChange(checked);
  const _onBlur = ({ target: { checked } }: FocusEvent<HTMLInputElement>) =>
    onBlur(id, checked);
  const _onFocus = ({ target: { checked } }: FocusEvent<HTMLInputElement>) =>
    onFocus(id, checked);

  const description = options.description || schema.description;

  return (
    <div
      style={{
        position: "relative",
        opacity: disabled || readonly ? 0.5 : 1,
        cursor: disabled || readonly ? "not-allowed" : "default",
      }}
      aria-describedby={ariaDescribedByIds<T>(id)}
    >
      {!hideLabel && !!description && (
        <DescriptionFieldTemplate
          id={descriptionId<T>(id)}
          description={description}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      <label style={{ display: "block", marginTop: "1rem" }}>
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={typeof value === "undefined" ? false : value}
          required={required}
          disabled={disabled || readonly}
          autoFocus={autofocus}
          onChange={_onChange}
          onBlur={_onBlur}
          onFocus={_onFocus}
          style={{
            color: "#3b82f6",
          }}
        />
        <span style={{ marginLeft: "0.5rem" }}>
          {labelValue(label, hideLabel || !label)}
        </span>
      </label>
    </div>
  );
}
