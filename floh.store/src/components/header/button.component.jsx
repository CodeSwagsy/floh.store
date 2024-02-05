import {Link} from "react-router-dom";

export const LinkButtonComponent = ({text, additionalClasses, link}) => {
    const classes = `flex shadow-sm flex-row items-center justify-center max-md:text-sm text-center text-whitesmoke rounded-lg ${additionalClasses}`;

    return (
        <Link to={link} className={classes}>
            <p>{text}</p>
        </Link>
    );
};
