import CheckboxWidget from "../CheckboxWidget/CheckboxWidget";
import CheckboxesWidget from "../CheckboxesWidget/CheckboxesWidget";
import RadioWidget from "../RadioWidget/RadioWidget";
import RangeWidget from "../RangeWidget/RangeWidget";
import SelectWidget from "../SelectWidget/SelectWidget";
import TextareaWidget from "../TextareaWidget/TextareaWidget";
import {
  FormContextType,
  RegistryWidgetsType,
  RJSFSchema,
  StrictRJSFSchema,
} from "@rjsf/utils";

/**
 * Generates custom widgets for React JSON Schema Form (RJSF).
 *
 * This function returns an object containing custom widgets for use in RJSF forms.
 * These widgets are used to customize the appearance and behavior of form elements.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @returns {RegistryWidgetsType<T, S, F>} An object containing custom widgets for the form elements.
 */
export function generateWidgets<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(): RegistryWidgetsType<T, S, F> {
  return {
    CheckboxWidget,
    CheckboxesWidget,
    RadioWidget,
    RangeWidget,
    SelectWidget,
    TextareaWidget,
  };
}

export default generateWidgets();
