import {Link} from "react-router-dom";

export const LinkButtonComponent = ({text, additionalClasses, link}) => {
    const classes = `flex shadow-sm flex-row items-center justify-center bg-jet lg:px-2 xl:px-4 xl:py-2 text-whitesmoke rounded-lg ${additionalClasses}`;

    return (
        <Link to={link} className={classes}>
            <p>{text}</p>
        </Link>
    );
};
