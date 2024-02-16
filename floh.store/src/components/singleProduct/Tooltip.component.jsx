import {useState} from "react";

export const Tooltip = ({ text, children }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div
            className="relative w-1/2 py-1 lg:py-1.5"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {children}
            {showTooltip && (
                <div className="absolute bg-gray-400 text-xs text-center cursor-default text-white py-1 rounded-lg max-md:leading-3 max-md:ml-0 max-md:-mt-9 max-lg:ml-4 max-lg:-mt-9 lg:-mt-11">
                    {text}
                </div>
            )}
        </div>
    );
};