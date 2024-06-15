import React from "react";
import {
  FormContextType,
  IconButtonProps,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
} from "@rjsf/utils";
import { IoIosCopy, IoIosRemove } from "react-icons/io";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
/**
 * IconButton component for React JSON Schema Form (RJSF).
 *
 * This component renders a customizable button with an icon, used for various actions within an RJSF form.
 * It supports different styles depending on the action type (e.g., normal, danger).
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @param {IconButtonProps<T, S, F>} props - The props required by the IconButton component.
 * @param {React.ReactNode} props.icon - The icon to be displayed inside the button.
 * @param {string} [props.iconType] - The type of the icon, used to adjust styles.
 * @param {string} [props.className] - Additional CSS class names to apply to the button.
 * @param {Object} props.uiSchema - The UI schema for the form.
 * @param {Object} props.registry - The registry containing various utility functions and components.
 * @param {boolean} [props.disabled] - Indicates whether the button is disabled.
 * @param {string} [props.variant] - The variant of the button, e.g., "danger" for a delete button.
 * @param {Object} [props.style] - Inline styles to apply to the button.
 *
 * @returns {JSX.Element} A button element with the specified icon and styles.
 */
export default function IconButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: IconButtonProps<T, S, F>) {
  const {
    icon,
    iconType,
    className,
    uiSchema,
    registry,
    disabled,
    ...otherProps
  } = props;

  let baseStyles: React.CSSProperties;
  let hoverStyles: React.CSSProperties;

  if (props.variant === "danger") {
    baseStyles = {
      backgroundColor: "#EF4444",
      color: "#ffffff",
    };
    hoverStyles = {
      backgroundColor: "#B91C1C",
    };
  } else if (disabled) {
    baseStyles = {
      backgroundColor: "#F3F4F6",
      color: "#D1D5DB",
    };
  } else {
    baseStyles = {
      backgroundColor: "#E5E7EB",
      color: "#374151",
    };
    hoverStyles = {
      backgroundColor: "#6B7280",
    };
  }

  const commonStyles = {
    fontFamily: "inherit",
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    borderRadius: "0.25rem",
    display: "grid",
    placeItems: "center",
    width: iconType === "block" ? "100%" : undefined,
    cursor: "pointer",
    transition: "background-color 0.15s ease-in-out",
  };

  return (
    <button
      {...otherProps}
      style={{ ...commonStyles, ...baseStyles, ...props.style }}
      onMouseOver={(e) => {
        if (hoverStyles) {
          e.currentTarget.style.backgroundColor = hoverStyles.backgroundColor;
        }
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = baseStyles.backgroundColor;
      }}
    >
      {icon}
    </button>
  );
}

/**
 * CopyButton component for React JSON Schema Form (RJSF).
 *
 * This component renders a button with a copy icon, used to duplicate items within an RJSF form.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @param {IconButtonProps<T, S, F>} props - The props required by the CopyButton component.
 *
 * @returns {JSX.Element} A button element with a copy icon.
 */
export function CopyButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: IconButtonProps<T, S, F>) {
  const {
    registry: { translateString },
  } = props;
  return (
    <IconButton
      title={translateString(TranslatableString.CopyButton)}
      {...props}
      icon={<IoIosCopy />}
    />
  );
}

/**
 * MoveDownButton component for React JSON Schema Form (RJSF).
 *
 * This component renders a button with a move-down icon, used to reorder items within an RJSF form.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @param {IconButtonProps<T, S, F>} props - The props required by the MoveDownButton component.
 *
 * @returns {JSX.Element} A button element with a move-down icon.
 */
export function MoveDownButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: IconButtonProps<T, S, F>) {
  const {
    registry: { translateString },
  } = props;
  return (
    <IconButton
      title={translateString(TranslatableString.MoveDownButton)}
      {...props}
      icon={<AiOutlineArrowDown />}
    />
  );
}

/**
 * MoveUpButton component for React JSON Schema Form (RJSF).
 *
 * This component renders a button with a move-up icon, used to reorder items within an RJSF form.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @param {IconButtonProps<T, S, F>} props - The props required by the MoveUpButton component.
 *
 * @returns {JSX.Element} A button element with a move-up icon.
 */
export function MoveUpButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: IconButtonProps<T, S, F>) {
  const {
    registry: { translateString },
  } = props;
  return (
    <IconButton
      title={translateString(TranslatableString.MoveUpButton)}
      {...props}
      icon={<AiOutlineArrowUp />}
    />
  );
}

/**
 * RemoveButton component for React JSON Schema Form (RJSF).
 *
 * This component renders a button with a remove icon, used to delete items within an RJSF form.
 * The button is styled as a "danger" variant to indicate the delete action.
 *
 * @template T - The type of the form data.
 * @template S - The schema type, extending StrictRJSFSchema, defaults to RJSFSchema.
 * @template F - The form context type, defaults to any.
 *
 * @param {IconButtonProps<T, S, F>} props - The props required by the RemoveButton component.
 *
 * @returns {JSX.Element} A button element with a remove icon.
 */
export function RemoveButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: IconButtonProps<T, S, F>) {
  const {
    registry: { translateString },
  } = props;
  return (
    <IconButton
      title={translateString(TranslatableString.RemoveButton)}
      {...props}
      variant="danger"
      icon={<IoIosRemove />}
    />
  );
}
