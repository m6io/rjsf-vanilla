import { ComponentType } from "react";

import { withTheme, FormProps } from "@rjsf/core";
import { generateTheme } from "../Theme";
import { FormContextType, RJSFSchema, StrictRJSFSchema } from "@rjsf/utils";

/**
 * Generates a custom form component for React JSON Schema Form (RJSF).
 *
 * This function utilizes the `withTheme` higher-order component from RJSF to apply a custom theme to the form.
 * The theme is generated using the `generateTheme` function, which provides a consistent look and feel across the form.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @returns {ComponentType<FormProps<T, S, F>>} A form component with the custom theme applied.
 */

export function generateForm<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(): ComponentType<FormProps<T, S, F>> {
  return withTheme<T, S, F>(generateTheme<T, S, F>());
}

export default generateForm();
