import {useState} from "react";

export const Tooltip = ({ text, children }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div
            className="relative w-full"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {children}
            {showTooltip && (
                <div className="absolute bg-gray-400 text-xs text-white px-2 py-1 rounded -mt-10">
                    {text}
                </div>
            )}
        </div>
    );
};