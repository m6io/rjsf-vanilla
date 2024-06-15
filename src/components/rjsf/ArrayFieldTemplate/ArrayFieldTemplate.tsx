import {
  ArrayFieldTemplateItemType,
  ArrayFieldTemplateProps,
  FormContextType,
  getTemplate,
  getUiOptions,
  RJSFSchema,
  StrictRJSFSchema,
} from "@rjsf/utils";

/**
 * ArrayFieldTemplate component for React JSON Schema Form (RJSF).
 *
 * This component renders a custom template for array fields in an RJSF form.
 * It manages the display of array items, including their title, description, and controls for adding new items.
 * The template utilizes various sub-templates for titles, descriptions, and array items, allowing for extensive customization.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @param {ArrayFieldTemplateProps<T, S, F>} props - The props required by the ArrayFieldTemplate component.
 * @param {boolean} props.canAdd - Indicates whether new items can be added to the array.
 * @param {boolean} props.disabled - Indicates whether the array field is disabled.
 * @param {Object} props.idSchema - The schema for the field's ID.
 * @param {Object} props.uiSchema - The UI schema for the form.
 * @param {Array} props.items - The array of items to be rendered in the field.
 * @param {Function} props.onAddClick - The function to call when the add button is clicked.
 * @param {boolean} props.readonly - Indicates whether the array field is read-only.
 * @param {Object} props.registry - The registry containing various utility functions and components, including templates and buttons.
 * @param {boolean} props.required - Indicates whether the array field is required.
 * @param {Object} props.schema - The JSON schema for the array field.
 * @param {string} props.title - The title of the array field.
 *
 * @returns {JSX.Element} A div element containing the array field and its associated controls.
 */
export default function ArrayFieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: ArrayFieldTemplateProps<T, S, F>) {
  const {
    canAdd,
    disabled,
    idSchema,
    uiSchema,
    items,
    onAddClick,
    readonly,
    registry,
    required,
    schema,
    title,
  } = props;

  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const ArrayFieldDescriptionTemplate = getTemplate<
    "ArrayFieldDescriptionTemplate",
    T,
    S,
    F
  >("ArrayFieldDescriptionTemplate", registry, uiOptions);
  const ArrayFieldItemTemplate = getTemplate<"ArrayFieldItemTemplate", T, S, F>(
    "ArrayFieldItemTemplate",
    registry,
    uiOptions
  );
  const ArrayFieldTitleTemplate = getTemplate<
    "ArrayFieldTitleTemplate",
    T,
    S,
    F
  >("ArrayFieldTitleTemplate", registry, uiOptions);

  const {
    ButtonTemplates: { AddButton },
  } = registry.templates;

  return (
    <div>
      <div style={{ padding: "0", margin: "0", display: "flex" }}>
        <div style={{ padding: "0", margin: "0", width: "100%" }}>
          <ArrayFieldTitleTemplate
            idSchema={idSchema}
            title={uiOptions.title || title}
            schema={schema}
            uiSchema={uiSchema}
            required={required}
            registry={registry}
          />
          <ArrayFieldDescriptionTemplate
            idSchema={idSchema}
            description={uiOptions.description || schema.description}
            schema={schema}
            uiSchema={uiSchema}
            registry={registry}
          />
          <div style={{ padding: "0", margin: "0", width: "100%" }}>
            {items &&
              items.map(
                ({
                  key,
                  ...itemProps
                }: ArrayFieldTemplateItemType<T, S, F>) => (
                  <ArrayFieldItemTemplate key={key} {...itemProps} />
                )
              )}
            {canAdd && (
              <div>
                <div style={{ marginTop: "0.5rem", display: "flex" }}>
                  <div style={{ width: "75%" }}></div>
                  <div
                    style={{
                      paddingLeft: "1rem",
                      paddingTop: "1.5rem",
                      paddingBottom: "1.5rem",
                      width: "25%",
                    }}
                  >
                    <AddButton
                      className="array-item-add"
                      onClick={onAddClick}
                      disabled={disabled || readonly}
                      uiSchema={uiSchema}
                      registry={registry}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
