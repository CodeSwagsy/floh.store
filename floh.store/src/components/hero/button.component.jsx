export function ButtonComponent({ text, additionalclasses, spantxt, size }) {
  const buttonWidthClass = size === "large" ? "w-full" : "w-16";
  const buttonHeightClass = height === "height" ? "h-12" : "h-1";

  const classes = `${additionalclasses} group rounded-md bg-white ${buttonWidthClass} ${buttonHeightClass} px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset shadow-2xl shadow-black ring-gray-300 hover:bg-emerald ease-in duration-300`;

  return (
    <button type={buttonType} className={classes}>
      {text}
      <span className="group-hover:text-white ease-in duration-300">
        {spantxt}
      </span>
    </button>
  );
}
