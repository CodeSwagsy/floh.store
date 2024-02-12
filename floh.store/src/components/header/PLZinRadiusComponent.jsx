// PLZinRadiusComponent.jsx
import React, {useState, useEffect} from "react";
import {useData} from "../../context/signin.context.jsx";

export const PLZinRadiusComponent = () => {
    const {updatePostalCode, updateRadius} = useData()

    const handlePostalCodeChange = (e) => {
        e.preventDefault()
        updatePostalCode(e.target.value);
    };
    const handleRadiusChange = (e) => {
        e.preventDefault()
        updateRadius(e.target.value);
    };

    // useEffect(() => {
    //     const fetchZips = async () => {
    //         if (!postalCode || postalCode.length < 5 || isNaN(postalCode)) {
    //             return;
    //         }
    //         try {
    //             const res = await fetch(`https://zip-api.eu/api/v1/radius/DE-${postalCode}/${radius}/km`, {
    //                 method: "GET",
    //                 mode: "cors",
    //             });
    //             const data = await res.json();
    //             const postalCodesArray = data.map(entry => entry.postal_code);
    //             updateZipCodes(postalCodesArray)
    //             console.log(postalCodesArray)
    //         } catch (error) {
    //             console.error("Error fetching postal codes:", error);
    //         }
    //     };
    //     fetchZips();
    // }, [radius]);


    return (
        <div className="flex items-center">
            <input
                type="text"
                className="block w-2/5 py-2.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
                onChange={handlePostalCodeChange}
                pattern="[0-9]*"
                inputMode="numeric"
                maxLength="5"
                placeholder="PLZ"
            />
            <select
                id="entfernung"
                name="entfernung"
                className="w-3/5 h-[44px] rounded-r-md py-2.5 w-32 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald  text-left"
                defaultValue="Umkreis"
                onChange={handleRadiusChange}
            >
                <option className="text-left pl-1"
                        value="umkreis">Umkreis
                </option>
                <option className="text-left pl-1" value="5">5</option>
                <option className="text-left pl-1" value="10">10</option>
                <option className="text-left pl-1" value="15">15</option>
                <option className="text-left pl-1" value="20">20</option>
                <option className="text-left pl-1" value="25">25</option>
                <option className="text-left pl-1" value="50">50</option>
                <option className="text-left pl-1" value="100">100</option>
                <option className="text-left pl-1" value="200">200</option>
            </select>
        </div>
    );
};
