export function ButtonComponent({ text, additionalclasses, spantxt }) {
  const classes = `${additionalclasses} group rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 shadow-xl ring-inset ring-gray-300  hover:bg-emerald ease-in duration-300`;
  return (
    <button type="button" className={classes}>
      {text}
      <span className="group-hover:text-white ease-in duration-300">
        {spantxt}
      </span>
      .
    </button>
  );
}
