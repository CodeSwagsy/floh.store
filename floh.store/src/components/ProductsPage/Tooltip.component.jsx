import {useState} from "react";

export const Tooltip = ({ text, children }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div
            className="relative w-full overflow-hidden"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {children}
            {showTooltip && (
                <div className="absolute bg-gray-400 text-xs text-white p-1 rounded max-lg:-mt-8 -mt-10  w-full">
                    {text}
                </div>
            )}
        </div>
    );
};