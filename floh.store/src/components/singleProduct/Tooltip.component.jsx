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
                <div className="absolute bg-gray-400 text-xs text-center text-white py-1 rounded-lg -mt-10">
                    {text}
                </div>
            )}
        </div>
    );
};