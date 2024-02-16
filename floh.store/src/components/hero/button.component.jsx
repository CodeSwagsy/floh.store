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
    const buttonWidthClass = size === "large" ? "w-3/5" : "w-16";
    const buttonHeightClass = height === "height" ? "h-12" : "h-1";

    const classes = `${additionalclasses} inline-block group rounded-lg bg-whitesmoke ${buttonWidthClass} ${buttonHeightClass} px-3 py-2 text-base font-semibold text-jet ring-1 shadow-black ring-jet hover:bg-springgreen hover:text-jet hover:ring-springgreen transition-all whitespace-nowrap`;

    return (
        <button type={buttonType} className={classes}>
            {text}
            <span className="text-emerald group-hover:text-whitesmoke transition-all">
        {spantxt}
      </span>
        </button>
    );
}
