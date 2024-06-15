import {
  canExpand,
  descriptionId,
  FormContextType,
  getTemplate,
  getUiOptions,
  ObjectFieldTemplateProps,
  RJSFSchema,
  StrictRJSFSchema,
  titleId,
} from "@rjsf/utils";

/**
 * ObjectFieldTemplate component for React JSON Schema Form (RJSF).
 *
 * This component renders a template for an object field in an RJSF form.
 * It manages the layout and presentation of the object's title, description, properties, and an optional add button for expanding the object.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @param {ObjectFieldTemplateProps<T, S, F>} props - The props required by the ObjectFieldTemplate component.
 * @param {React.ReactNode} [props.description] - The description of the object field.
 * @param {string} [props.title] - The title of the object field.
 * @param {Array<Object>} props.properties - The properties of the object field, each containing content and hidden flag.
 * @param {boolean} [props.required] - Indicates whether the object field is required.
 * @param {Object} props.uiSchema - The UI schema for the object field.
 * @param {Object} props.idSchema - The schema for the field's ID, used to generate unique IDs.
 * @param {Object} props.schema - The JSON schema for the object field.
 * @param {any} props.formData - The form data associated with the object field.
 * @param {Function} props.onAddClick - The function to call when the add button is clicked.
 * @param {boolean} [props.disabled] - Indicates whether the object field is disabled.
 * @param {boolean} [props.readonly] - Indicates whether the object field is read-only.
 * @param {Object} props.registry - The registry containing various utility functions and components, including templates.
 *
 * @returns {JSX.Element} A JSX element representing the object field template.
 */
export default function ObjectFieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({
  description,
  title,
  properties,
  required,
  uiSchema,
  idSchema,
  schema,
  formData,
  onAddClick,
  disabled,
  readonly,
  registry,
}: ObjectFieldTemplateProps<T, S, F>) {
  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const TitleFieldTemplate = getTemplate<"TitleFieldTemplate", T, S, F>(
    "TitleFieldTemplate",
    registry,
    uiOptions
  );
  const DescriptionFieldTemplate = getTemplate<
    "DescriptionFieldTemplate",
    T,
    S,
    F
  >("DescriptionFieldTemplate", registry, uiOptions);
  const {
    ButtonTemplates: { AddButton },
  } = registry.templates;

  return (
    <>
      {title && (
        <TitleFieldTemplate
          id={titleId<T>(idSchema)}
          title={title}
          required={required}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      {description && (
        <DescriptionFieldTemplate
          id={descriptionId<T>(idSchema)}
          description={description}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      <div style={{ padding: "0" }}>
        {properties.map((element: any, index: number) => (
          <div
            key={index}
            style={{
              display: element.hidden ? "none" : "flex",
              marginBottom: "0.625rem", // 2.5 rem
            }}
          >
            <div style={{ width: "100%" }}> {element.content}</div>
          </div>
        ))}
        {canExpand(schema, uiSchema, formData) ? (
          <div style={{ display: "flex" }}>
            <div
              style={{
                paddingTop: "1rem",
                paddingBottom: "1rem",
                width: "25%",
              }}
            >
              <AddButton
                onClick={onAddClick(schema)}
                disabled={disabled || readonly}
                className="object-property-expand"
                uiSchema={uiSchema}
                registry={registry}
              />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
