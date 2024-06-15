import { CSSProperties } from "react";
import {
  ArrayFieldTemplateItemType,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from "@rjsf/utils";

/**
 * ArrayFieldItemTemplate component for React JSON Schema Form (RJSF).
 *
 * This component renders a custom template for items within an array field in an RJSF form.
 * It provides a layout for each array item, including controls for reordering, copying, and removing items.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @param {ArrayFieldTemplateItemType<T, S, F>} props - The props required by the ArrayFieldItemTemplate component.
 * @param {React.ReactNode} props.children - The child elements to be rendered within the array item.
 * @param {boolean} props.disabled - Indicates whether the array item is disabled.
 * @param {boolean} props.hasToolbar - Indicates whether the toolbar is displayed for the array item.
 * @param {boolean} props.hasCopy - Indicates whether the copy button is displayed for the array item.
 * @param {boolean} props.hasMoveDown - Indicates whether the move down button is displayed for the array item.
 * @param {boolean} props.hasMoveUp - Indicates whether the move up button is displayed for the array item.
 * @param {boolean} props.hasRemove - Indicates whether the remove button is displayed for the array item.
 * @param {number} props.index - The index of the current array item.
 * @param {Function} props.onCopyIndexClick - The function to call when the copy button is clicked.
 * @param {Function} props.onDropIndexClick - The function to call when the remove button is clicked.
 * @param {Function} props.onReorderClick - The function to call when the move up or move down button is clicked.
 * @param {boolean} props.readonly - Indicates whether the array item is read-only.
 * @param {Object} props.registry - The registry containing various utility functions and components, including button templates.
 * @param {Object} props.uiSchema - The UI schema for the form.
 *
 * @returns {JSX.Element} A div element containing the array item and its associated controls.
 */
export default function ArrayFieldItemTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: ArrayFieldTemplateItemType<T, S, F>) {
  const {
    children,
    disabled,
    hasToolbar,
    hasCopy,
    hasMoveDown,
    hasMoveUp,
    hasRemove,
    index,
    onCopyIndexClick,
    onDropIndexClick,
    onReorderClick,
    readonly,
    registry,
    uiSchema,
  } = props;

  const { CopyButton, MoveDownButton, MoveUpButton, RemoveButton } =
    registry.templates.ButtonTemplates;

  const btnStyle: CSSProperties = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: "bold",
  };

  const flexNoneStyle: CSSProperties = {
    flex: "none",
    width: "75%",
  };

  const flexNoneQuarterStyle: CSSProperties = {
    flex: "none",
    width: "25%",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "1.5rem",
    paddingBottom: "1.5rem",
  };

  const marginBottomStyle: CSSProperties = {
    marginBottom: "0.5rem",
  };

  const flexItemsCenterStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
  };

  return (
    <div>
      <div style={{ ...marginBottomStyle, ...flexItemsCenterStyle }}>
        <div style={flexNoneStyle}>{children}</div>
        <div style={flexNoneQuarterStyle}>
          {hasToolbar && (
            <div style={{ display: "flex" }}>
              {(hasMoveUp || hasMoveDown) && (
                <div>
                  <MoveUpButton
                    style={btnStyle}
                    disabled={disabled || readonly || !hasMoveUp}
                    onClick={onReorderClick(index, index - 1)}
                    uiSchema={uiSchema}
                    registry={registry}
                  />
                </div>
              )}
              {(hasMoveUp || hasMoveDown) && (
                <div>
                  <MoveDownButton
                    style={btnStyle}
                    disabled={disabled || readonly || !hasMoveDown}
                    onClick={onReorderClick(index, index + 1)}
                    uiSchema={uiSchema}
                    registry={registry}
                  />
                </div>
              )}
              {hasCopy && (
                <div>
                  <CopyButton
                    style={btnStyle}
                    disabled={disabled || readonly}
                    onClick={onCopyIndexClick(index)}
                    uiSchema={uiSchema}
                    registry={registry}
                  />
                </div>
              )}
              {hasRemove && (
                <div>
                  <RemoveButton
                    style={btnStyle}
                    disabled={disabled || readonly}
                    onClick={onDropIndexClick(index)}
                    uiSchema={uiSchema}
                    registry={registry}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
