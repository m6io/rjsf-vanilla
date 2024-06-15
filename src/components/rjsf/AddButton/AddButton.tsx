import React, { useState } from "react";
import {
  FormContextType,
  IconButtonProps,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
} from "@rjsf/utils";
import { BsPlus } from "react-icons/bs";

/**
 * AddButton component for React JSON Schema Form (RJSF).
 *
 * This component renders a custom button used to add new items in RJSF forms.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @param {IconButtonProps<T, S, F>} props - The props required by the IconButton component.
 * @param {Object} props.uiSchema - The UI schema for the form.
 * @param {Object} props.registry - The registry containing various utility functions and components.
 * @param {...Object} props.props - Additional props to be passed to the button element.
 *
 * @returns {JSX.Element} A button element styled for adding new items in an RJSF form.
 */
export default function AddButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({ uiSchema, registry, ...props }: IconButtonProps<T, S, F>) {
  const { translateString } = registry;

  const [hover, setHover] = useState(false);

  const defaultStyles = {
    width: "100%",
    backgroundColor: "#3B82F6",
    color: "#FFFFFF",
    fontWeight: 400,
    fontSize: "1rem",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    borderRadius: "0.25rem",
    marginLeft: "0.25rem",
    display: "grid",
    placeItems: "center",
    lineHeight: "1.5rem",
  };

  const hoverStyles = {
    backgroundColor: "#1D4ED8",
  };

  return (
    <button
      {...props}
      style={hover ? { ...defaultStyles, ...hoverStyles } : defaultStyles}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={props.className}
      title={translateString(TranslatableString.AddItemButton)}
    >
      <BsPlus />
    </button>
  );
}
