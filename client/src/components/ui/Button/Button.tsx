interface ButtonProps {
  textValue: string;

  /**
   * Tailwind CSS utility classes to style the button.
   *
   * Predefined style presets:
   * - `defaultButtonStyle`: General-purpose button style
   * - `formButtonStyle`: Specifically for buttons used inside forms
   *
   * You can also append any custom Tailwind classes as needed.
   *
   * **Example**
   * ```ts
   * className="defaultButtonStyle bg-blue-500 hover:bg-blue-600"
   * ```
   * To add or modify custom class names, refer to `tailwind.config.js`.
   */
  className: string;
}

export default function Button({ textValue = "This is a button", className }: ButtonProps) {
  const defaultStyle = "p-[10px_25px] text-4 transition-all duration-200 ease";

  return <button className={`${defaultStyle} ${className}`}>{textValue}</button>;
}
