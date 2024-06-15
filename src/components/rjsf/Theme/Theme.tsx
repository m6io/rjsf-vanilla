import { ThemeProps } from "@rjsf/core";

import { generateTemplates } from "../Templates";
import { generateWidgets } from "../Widgets";
import { FormContextType, RJSFSchema, StrictRJSFSchema } from "@rjsf/utils";

/**
 * Generates a custom theme for React JSON Schema Form (RJSF).
 *
 * This function returns an object containing custom templates and widgets for use in RJSF forms.
 * The generated theme can be used to provide a consistent look and feel across the form,
 * and to customize the behavior and appearance of form elements.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @returns {ThemeProps<T, S, F>} An object containing custom templates and widgets for the form.
 */
export function generateTheme<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(): ThemeProps<T, S, F> {
  return {
    templates: generateTemplates<T, S, F>(),
    widgets: generateWidgets<T, S, F>(),
  };
}

export default generateTheme();
