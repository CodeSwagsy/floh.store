
export const ButtonComponent = ({ text, additionalClasses }) => {
    const classes = `flex shadow-sm flex-row items-center justify-center bg-jet lg:px-2 xl:px-4 xl:py-2 text-whitesmoke rounded-lg ${additionalClasses}`;

    return (
        <button className={classes}>
            <p>{text}</p>
        </button>
    );
};
