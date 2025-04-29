interface ButtonProps {
  textValue: string;
  /**
   * CSS classes to apply to the button.
   *
   * Try to apply the classes in this order:
   *
   *  **width**, **paddings** and **margins**, **background** and **text colours**, **borders**, **font weight** and **size**, **duration** and **hover**. Apply any other additional classes at the end, after hover.
   *
   * If any classes are not necessary to include, skip them and continue with the order.
   * @example
   * className="w-full bg-black text-white font-bold" // paddings, margins, borders and some other classes were skipped but continued with the order provided above.
   */
  className: string;
}

export default function Button({ textValue = "This is a button", className }: ButtonProps) {
  const defaultStyle =
    "max-w-[150px] p-[10px_25px] bg-[transparent] text-white border-2 border-white font-normal text-4 transition-all duration-200 ease hover:bg-white hover:text-black";

  return <button className={`${defaultStyle} ${className}`}>{textValue}</button>;
}
