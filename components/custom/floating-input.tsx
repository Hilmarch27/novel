"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface FloatingLabelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string; // Add an `id` prop for the input
}

export const FloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>(({ className, label, type, id, ...props }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(e.target.value !== "");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value !== "");
    props.onChange?.(e);
  };

  return (
    <div className="relative">
      <input
        type={type}
        id={id} // Set the `id` here
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          isFocused && "ring-2 ring-ring ring-offset-2",
          className
        )}
        ref={ref}
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder=" "
      />
      <label
        htmlFor={id} // Use `htmlFor` to associate label with input
        className={cn(
          "absolute left-1 top-2 px-1 text-sm text-muted-foreground transition-all duration-200",
          (isFocused || hasValue) &&
            "left-3 top-[-0.6rem] z-10 text-xs text-primary bg-background",
          isFocused && "text-ring"
        )}
      >
        {label}
      </label>
    </div>
  );
});

FloatingLabelInput.displayName = "FloatingLabelInput";
