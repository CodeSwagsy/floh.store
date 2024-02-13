import {useData} from "../../context/signin.context.jsx";
import {useNavigate} from "react-router-dom";

export function ButtonComponent({
  text,
  additionalclasses,
  spantxt,
  size,
  height,
  buttonType,
}) {
  const buttonWidthClass = size === "large" ? "w-full" : "w-16";
  const buttonHeightClass = height === "height" ? "h-12" : "h-1";

  const classes = `${additionalclasses} group rounded-lg bg-white ${buttonWidthClass} ${buttonHeightClass} px-3 py-2 text-sm font-semibold text-gray-900 ring-1  shadow-black ring-gray-300 hover:bg-emerald transition-all`;

  return (
    <button type={buttonType} className={classes}>
      {text}
      <span className="group-hover:text-white transition-all">
        {spantxt}
      </span>
    </button>
  );
}
